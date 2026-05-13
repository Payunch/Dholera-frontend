import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Box, Typography, IconButton, CircularProgress, Checkbox, FormControlLabel, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { useLead } from '../context/LeadContext';
import { API_BASE_URL } from '../utils/apiBase';

const LeadPopup = ({ sessionId, fingerprint, compulsory = false, onSuccess }) => {
  const { loginLead } = useLead();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('details'); // details, otp, passcode, login, success
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', otp: '', passcode: '' });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (compulsory) {
      setOpen(true);
      return;
    }

    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        const token = localStorage.getItem('lead_token');
        if (!token) {
          setOpen(true);
          sessionStorage.setItem('hasSeenPopup', 'true');
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [compulsory]);

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!consentAccepted) {
      setError('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/register-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          browserFingerprint: fingerprint 
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStep('otp');
      } else if (data.alreadyRegistered) {
        setError('You are already registered. Please login.');
        setStep('login');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.otp)) {
      setError('Please enter the 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/verify-registration-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: formData.otp })
      });
      const data = await res.json();
      if (res.ok) {
        setStep('passcode');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupPasscode = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.passcode)) {
      setError('Passcode must be 6 digits.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/setup-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, passcode: formData.passcode })
      });
      const data = await res.json();
      if (res.ok) {
        completeAuth(data);
      } else {
        setError(data.error || 'Failed to setup passcode');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setError('Enter valid 10-digit number.');
      return;
    }
    if (!/^\d{6}$/.test(formData.passcode)) {
      setError('Enter 6-digit passcode.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/login-with-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, passcode: formData.passcode })
      });
      const data = await res.json();
      if (res.ok) {
        completeAuth(data);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeAuth = (data) => {
    if (data.lead_token) {
      localStorage.setItem('lead_token', data.lead_token);
      localStorage.setItem('lead_email', data.lead.email);
      localStorage.setItem('lead_phone', data.lead.phone);
      localStorage.setItem('lead_name', data.lead.name);
      
      loginLead({ 
        name: data.lead.name, 
        phone: data.lead.phone, 
        token: data.lead_token 
      });
    }
    setStep('success');
    if (onSuccess) onSuccess(data);
    setTimeout(() => setOpen(false), 2000);
  };

  const handleClose = (event, reason) => {
    if (compulsory) return;
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    setOpen(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="xs" 
      fullWidth
      disableEscapeKeyDown={compulsory}
    >
      <Box sx={{ position: 'relative', p: 3 }}>
        {!compulsory && (
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
        
        <DialogTitle sx={{ fontWeight: 800, color: 'primary.main', textAlign: 'center', px: 0, pt: 1 }}>
          {step === 'success' ? '✓ Welcome' : step === 'login' ? 'Welcome Back' : compulsory ? '🔐 Unlock Access' : 'Exclusive Access'}
        </DialogTitle>

        <DialogContent sx={{ px: 0 }}>
          {error && <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>{error}</Typography>}

          {step === 'details' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Join our platform to access planning documents
              </DialogContentText>
              <form id="details-form" onSubmit={handleRequestOtp}>
                <TextField fullWidth margin="dense" label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <TextField 
                  fullWidth 
                  margin="dense" 
                  label="Mobile Number" 
                  placeholder="10-digit number"
                  required 
                  inputProps={{ maxLength: 10 }}
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
                />
                <TextField fullWidth margin="dense" label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <FormControlLabel
                  sx={{ mt: 1, alignItems: 'flex-start' }}
                  control={<Checkbox checked={consentAccepted} onChange={e => setConsentAccepted(e.target.checked)} sx={{ mt: 0.25 }} />}
                  label={(
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      I agree to the <Link component={RouterLink} to="/terms-and-conditions" target="_blank">T&C</Link> and <Link component={RouterLink} to="/privacy-policy" target="_blank">Privacy Policy</Link>.
                    </Typography>
                  )}
                />
              </form>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link component="button" variant="body2" onClick={() => { setStep('login'); setError(''); }}>Existing User? Login</Link>
              </Box>
            </>
          )}

          {step === 'otp' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Enter the 6-digit code sent to <strong>{formData.email}</strong>
              </DialogContentText>
              <form id="otp-form" onSubmit={handleVerifyOtp}>
                <TextField 
                  fullWidth 
                  autoFocus 
                  label="Verification Code" 
                  required 
                  inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px' } }}
                  value={formData.otp} 
                  onChange={e => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})} 
                />
              </form>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link component="button" variant="body2" onClick={() => setStep('details')}>Back to Details</Link>
              </Box>
            </>
          )}

          {step === 'passcode' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Set a <strong>6-digit passcode</strong> for future logins
              </DialogContentText>
              <form id="passcode-form" onSubmit={handleSetupPasscode}>
                <TextField 
                  fullWidth 
                  autoFocus 
                  type="password"
                  label="New Passcode" 
                  required 
                  inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px' } }}
                  value={formData.passcode} 
                  onChange={e => setFormData({...formData, passcode: e.target.value.replace(/\D/g, '')})} 
                />
              </form>
            </>
          )}

          {step === 'login' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Login with your phone and passcode
              </DialogContentText>
              <form id="login-form" onSubmit={handleLogin}>
                <TextField 
                  fullWidth 
                  margin="dense" 
                  label="Mobile Number" 
                  required 
                  inputProps={{ maxLength: 10 }}
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
                />
                <TextField 
                  fullWidth 
                  margin="dense" 
                  type="password"
                  label="6-Digit Passcode" 
                  required 
                  inputProps={{ maxLength: 6 }}
                  value={formData.passcode} 
                  onChange={e => setFormData({...formData, passcode: e.target.value.replace(/\D/g, '')})} 
                />
              </form>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Link component="button" variant="body2" onClick={() => { setStep('details'); setError(''); }}>New User? Join</Link>
                <Link component={RouterLink} to="/admin/login" variant="body2" color="secondary">Admin Login</Link>
              </Box>
            </>
          )}

          {step === 'success' && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="success.main" variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Access Granted
              </Typography>
              <Typography variant="body1">
                Redirecting you to platform...
              </Typography>
            </Box>
          )}
        </DialogContent>

        {step !== 'success' && (
          <DialogActions sx={{ pb: 0, pt: 2 }}>
            <Button 
              type="submit" 
              form={step === 'details' ? 'details-form' : step === 'otp' ? 'otp-form' : step === 'passcode' ? 'passcode-form' : 'login-form'}
              variant="contained" 
              color="secondary" 
              fullWidth 
              size="large" 
              disabled={loading}
              sx={{ fontWeight: 800, py: 1.5, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 
               step === 'details' ? 'Get Verification Code' : 
               step === 'otp' ? 'Verify Code' : 
               step === 'passcode' ? 'Complete Setup' : 'Login'}
            </Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
};

export default LeadPopup;
