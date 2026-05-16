import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { useLead } from '../context/LeadContext';
import { API_BASE_URL } from '../utils/apiBase';
import { safeLocalStorage, safeSessionStorage } from '../utils/storage';
import { SplitLogo } from './DynamicImages';

const INITIAL_FORM_DATA = {
  // ...

  phone: '',
  email: '',
  otp: '',
  passcode: '',
  verificationToken: ''
};

const sanitizeDigits = (value, maxLength) => value.replace(/\D/g, '').slice(0, maxLength);
const validateName = (name) => name.trim().length >= 2;
const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LeadPopup = ({ sessionId, fingerprint, compulsory = false, onSuccess }) => {
  const { loginLead } = useLead();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('details');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (compulsory) {
      setOpen(true);
      sessionStorage.setItem('hasSeenPopup', 'true');
      return;
    }

    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      // Mark as seen immediately so that refreshes or navigations within the 
      // 10s window don't keep resetting the timer or triggering it again.
      sessionStorage.setItem('hasSeenPopup', 'true');
      
      const timer = setTimeout(() => {
        const token = localStorage.getItem('lead_token');
        if (!token) {
          setOpen(true);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [compulsory]);

  useEffect(() => {
    if (resendCountdown <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setResendCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendCountdown]);

  const updateFormField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  };

  const goToStep = (nextStep) => {
    setError('');
    setStatusMessage('');
    setStep(nextStep);
  };

  const requestOtp = async ({ isResend = false } = {}) => {
    const cleanName = formData.name.trim().replace(/\s+/g, ' ');
    const cleanPhone = sanitizeDigits(formData.phone, 10);
    const cleanEmail = formData.email.trim().toLowerCase();

    if (!validateName(cleanName)) {
      setError('Please enter your full name.');
      return false;
    }

    if (!validatePhone(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return false;
    }

    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!consentAccepted) {
      setError('Please accept the Terms & Conditions and Privacy Policy.');
      return false;
    }

    setLoading(true);
    setError('');
    setStatusMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/leads/register-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          sessionId,
          browserFingerprint: fingerprint
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.alreadyRegistered) {
          setError('You are already registered. Please login with your passcode.');
          setFormData((current) => ({
            ...current,
            name: cleanName,
            phone: cleanPhone,
            email: cleanEmail,
            otp: '',
            passcode: '',
            verificationToken: ''
          }));
          setStep('login');
          return false;
        }

        setError(data.error || 'Failed to send verification code.');
        return false;
      }

      setFormData((current) => ({
        ...current,
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        otp: '',
        passcode: '',
        verificationToken: ''
      }));
      setResendCountdown(30);
      setStatusMessage(isResend ? 'A fresh verification code has been sent to your email.' : data.message || 'Verification code sent to your email.');
      setStep('otp');
      return true;
    } catch (err) {
      setError('Connection error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    await requestOtp();
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(formData.otp)) {
      setError('Please enter the 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');
    setStatusMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/leads/verify-registration-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: formData.otp })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid verification code.');
        return;
      }

      if (!data.verification_token) {
        setError('Verification completed, but setup could not continue. Please request a new code.');
        return;
      }

      setFormData((current) => ({
        ...current,
        otp: '',
        passcode: '',
        verificationToken: data.verification_token
      }));
      setStatusMessage(data.message || 'Email verified. Please set your 6-digit passcode.');
      setStep('passcode');
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupPasscode = async (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(formData.passcode)) {
      setError('Passcode must be exactly 6 digits.');
      return;
    }

    if (!formData.verificationToken) {
      setError('Verification expired. Please request a new OTP.');
      setStep('details');
      return;
    }

    setLoading(true);
    setError('');
    setStatusMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/leads/setup-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          passcode: formData.passcode,
          verificationToken: formData.verificationToken
        })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to set passcode.');
        if (res.status === 403) {
          setFormData((current) => ({
            ...current,
            otp: '',
            passcode: '',
            verificationToken: ''
          }));
        }
        return;
      }

      completeAuth(data);
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const cleanPhone = sanitizeDigits(formData.phone, 10);
    if (!validatePhone(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!/^\d{6}$/.test(formData.passcode)) {
      setError('Please enter your 6-digit passcode.');
      return;
    }

    setLoading(true);
    setError('');
    setStatusMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/leads/login-with-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, passcode: formData.passcode })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      completeAuth(data);
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

    setStatusMessage('');
    setError('');
    setStep('success');
    if (onSuccess) {
      onSuccess(data);
    }
    window.setTimeout(() => setOpen(false), 2000);
  };

  const handleClose = (_, reason) => {
    if (compulsory) {
      return;
    }

    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }

    setOpen(false);
  };

  const activeFormId =
    step === 'details'
      ? 'details-form'
      : step === 'otp'
        ? 'otp-form'
        : step === 'passcode'
          ? 'passcode-form'
          : 'login-form';

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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
          <SplitLogo isFull={false} height={50} />
        </Box>

        <DialogTitle sx={{ fontWeight: 800, color: 'primary.main', textAlign: 'center', px: 0, pt: 1 }}>
          {step === 'success'
            ? 'Welcome'
            : step === 'login'
              ? 'Welcome Back'
              : compulsory
                ? 'Unlock Access'
                : 'Exclusive Access'}
        </DialogTitle>

        <DialogContent sx={{ px: 0 }}>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
              {error}
            </Typography>
          )}

          {statusMessage && step !== 'success' && (
            <Typography color="success.main" variant="body2" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
              {statusMessage}
            </Typography>
          )}

          {step === 'details' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Join our platform to access planning documents.
              </DialogContentText>
              <form id="details-form" onSubmit={handleRequestOtp}>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Full Name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(event) => updateFormField('name', event.target.value)}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Mobile Number"
                  placeholder="10-digit number"
                  autoComplete="tel"
                  required
                  inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={formData.phone}
                  onChange={(event) => updateFormField('phone', sanitizeDigits(event.target.value, 10))}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => updateFormField('email', event.target.value.trimStart())}
                  onBlur={() => updateFormField('email', formData.email.trim().toLowerCase())}
                />
                <FormControlLabel
                  sx={{ mt: 1, alignItems: 'flex-start' }}
                  control={(
                    <Checkbox
                      checked={consentAccepted}
                      onChange={(event) => setConsentAccepted(event.target.checked)}
                      sx={{ mt: 0.25 }}
                    />
                  )}
                  label={(
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      I agree to the <Link component={RouterLink} to="/terms-and-conditions" target="_blank">T&amp;C</Link> and <Link component={RouterLink} to="/privacy-policy" target="_blank">Privacy Policy</Link>.
                    </Typography>
                  )}
                />
              </form>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => goToStep('login')}
                >
                  Existing user or admin? Sign in
                </Link>
              </Box>
            </>
          )}

          {step === 'otp' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Enter the 6-digit code sent to <strong>{formData.email}</strong>.
              </DialogContentText>
              <form id="otp-form" onSubmit={handleVerifyOtp}>
                <TextField
                  fullWidth
                  autoFocus
                  label="Verification Code"
                  required
                  inputProps={{
                    maxLength: 6,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }
                  }}
                  value={formData.otp}
                  onChange={(event) => updateFormField('otp', sanitizeDigits(event.target.value, 6))}
                />
              </form>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button variant="text" size="small" onClick={() => goToStep('details')} disabled={loading}>
                  Edit details
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => requestOtp({ isResend: true })}
                  disabled={loading || resendCountdown > 0}
                >
                  {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend code'}
                </Button>
              </Box>
            </>
          )}

          {step === 'passcode' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Set your <strong>6-digit passcode</strong>. You will use it for future logins.
              </DialogContentText>
              <form id="passcode-form" onSubmit={handleSetupPasscode}>
                <TextField
                  fullWidth
                  autoFocus
                  type="password"
                  label="New Passcode"
                  required
                  inputProps={{
                    maxLength: 6,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }
                  }}
                  value={formData.passcode}
                  onChange={(event) => updateFormField('passcode', sanitizeDigits(event.target.value, 6))}
                  helperText="Use a 6-digit numeric passcode."
                />
              </form>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="text" size="small" onClick={() => goToStep('details')} disabled={loading}>
                  Start over
                </Button>
              </Box>
            </>
          )}

          {step === 'login' && (
            <>
              <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
                Registered users can sign in with their mobile number and 6-digit passcode.
              </DialogContentText>
              <form id="login-form" onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Mobile Number"
                  autoComplete="tel"
                  required
                  inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={formData.phone}
                  onChange={(event) => updateFormField('phone', sanitizeDigits(event.target.value, 10))}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  type="password"
                  label="6-Digit Passcode"
                  autoComplete="current-password"
                  required
                  inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={formData.passcode}
                  onChange={(event) => updateFormField('passcode', sanitizeDigits(event.target.value, 6))}
                />
              </form>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => goToStep('details')}
                >
                  New user? Join
                </Link>
                <Link component={RouterLink} to="/admin/login" variant="body2" color="secondary">
                  Admin Login
                </Link>
              </Box>
            </>
          )}

          {step === 'success' && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="success.main" variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Access Granted
              </Typography>
              <Typography variant="body1">
                Redirecting you to the platform...
              </Typography>
            </Box>
          )}
        </DialogContent>

        {step !== 'success' && (
          <DialogActions sx={{ pb: 0, pt: 2 }}>
            <Button
              type="submit"
              form={activeFormId}
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ fontWeight: 800, py: 1.5, borderRadius: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : step === 'details' ? (
                'Get Verification Code'
              ) : step === 'otp' ? (
                'Verify Code'
              ) : step === 'passcode' ? (
                'Complete Setup'
              ) : (
                'Login'
              )}
            </Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
};

export default LeadPopup;
