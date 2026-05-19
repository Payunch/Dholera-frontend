import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, IconButton, Paper, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { API_BASE_URL } from '../utils/apiBase';
import { safeLocalStorage } from '../utils/storage';

const SecurePdfViewer = ({ pdfId, onClose }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Use localStorage values directly to ensure we have the latest after verification
  const leadPhone = safeLocalStorage.getItem('lead_phone') || 'VERIFIED';
  const leadEmail = safeLocalStorage.getItem('lead_email') || 'VERIFIED';
  const leadName = safeLocalStorage.getItem('lead_name') || 'Guest';
  const token = safeLocalStorage.getItem('lead_token');

  // Enhanced mobile detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                   (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent));

  const directUrl = `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`;

  const fetchPdf = async () => {
    setLoading(true);
    setError(null);
    setRequiresPayment(false);
    try {
      if (!token) throw new Error('Verification required to access this document.');

      const res = await fetch(`${API_BASE_URL}/pdf/view/${pdfId}`, {
        headers: { 'Authorization': token }
      });

      if (res.status === 402) {
        setRequiresPayment(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Server error' }));
        throw new Error(errData.error || `Failed to load document (${res.status})`);
      }

      // On Mobile, we prefer the direct URL via a new tab as it's more reliable than iframes with blobs
      if (isMobile) {
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      if (blob.type !== 'application/pdf') {
        console.warn('Received non-PDF blob type:', blob.type);
      }
      
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (err) {
      console.error('SecurePdfViewer Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pdfId) {
      setError('Invalid document ID');
      setLoading(false);
      return;
    }

    fetchPdf();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [pdfId, token, isMobile]);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ pdfId, leadToken: token })
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order');

      if (orderData.alreadyPurchased) {
        fetchPdf();
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Dholera Platform',
        description: 'Premium Document Access',
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify({
                ...response,
                pdfId,
                leadToken: token
              })
            });

            if (verifyRes.ok) {
              fetchPdf();
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setError('Connection error during verification.');
          }
        },
        prefill: {
          name: leadName,
          email: leadEmail,
          contact: leadPhone
        },
        theme: { color: '#1e3a8a' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleOpenNewTab = () => {
    if (directUrl) {
      window.open(directUrl, '_blank');
    }
  };

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: isMobile ? 1 : 2, display: 'flex', justifyContent: 'space-between', bgcolor: '#1e1e1e', gap: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <PictureAsPdfIcon sx={{ color: 'secondary.main' }} />
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            SECURE VIEW (PRINTING & DOWNLOAD DISABLED)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {!loading && !error && isMobile && (
            <Button 
              variant="contained" 
              color="secondary" 
              size="small" 
              onClick={handleOpenNewTab}
              sx={{ fontWeight: 700 }}
            >
              Full Screen
            </Button>
          )}
          <IconButton color="error" onClick={onClose} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: isMobile ? 2 : 2 }}>
        {loading && <CircularProgress color="primary" />}
        {requiresPayment && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff', borderRadius: 4, maxWidth: 450, boxShadow: 10 }}>
            <Box sx={{ mb: 3 }}>
              <PictureAsPdfIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a8a' }}>Premium Document</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                This official map/brochure is verified and gated. Pay a small fee of ₹10 to unlock lifetime access.
              </Typography>
            </Box>
            
            <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2, mb: 3, border: '1px dashed #cbd5e1' }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e3a8a' }}>₹10.00</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>One-time payment per document</Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              disabled={paymentLoading}
              onClick={handlePayment}
              sx={{ 
                py: 1.5, fontSize: '1.1rem', fontWeight: 800, borderRadius: 3,
                bgcolor: '#1e3a8a', '&:hover': { bgcolor: '#1e40af' }
              }}
            >
              {paymentLoading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now & Unlock'}
            </Button>
            
            <Button variant="text" fullWidth onClick={onClose} sx={{ mt: 2, color: 'text.secondary' }}>
              Cancel
            </Button>
          </Paper>
        )}
        {error && !requiresPayment && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff', borderRadius: 4, maxWidth: 400 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 2 }}>Access Denied</Typography>
            <Typography color="text.secondary" variant="body1" sx={{ mb: 3 }}>{error}</Typography>
            <Button variant="contained" onClick={onClose}>Close Viewer</Button>
          </Paper>
        )}
        {!loading && !error && (isMobile || blobUrl) && (
          <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            maxWidth: isMobile ? '100%' : '1100px', 
            boxShadow: 24, 
            bgcolor: 'white',
            overflow: 'hidden',
            borderRadius: isMobile ? 2 : 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Tiled Watermark - Only show on desktop with iframe or if we have a mobile container */}
            <Box sx={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
              pointerEvents: 'none', zIndex: 10, overflow: 'hidden', opacity: 0.08,
              display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gridTemplateRows: 'repeat(4, 1fr)'
            }}>
              {[...Array(isMobile ? 8 : 12)].map((_, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-30deg)' }}>
                  <Typography variant="caption" sx={{ color: 'black', fontWeight: 900, userSelect: 'none', textAlign: 'center', fontSize: isMobile ? '0.6rem' : '0.75rem' }}>
                    {leadPhone} <br/> {leadEmail}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            {/* Overlay to block toolbar clicks on desktop */}
            {!isMobile && (
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: 56, 
                zIndex: 20, 
                bgcolor: 'transparent',
                pointerEvents: 'auto',
                cursor: 'not-allowed'
              }} title="Toolbar restricted in secure view" />
            )}

            {isMobile ? (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4, textAlign: 'center', gap: 3 }}>
                <PictureAsPdfIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Document Ready</Typography>
                  <Typography variant="body2" color="text.secondary">
                    For the best experience on mobile, please open the document in full screen mode.
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={handleOpenNewTab}
                  startIcon={<PictureAsPdfIcon />}
                  sx={{ borderRadius: 4, boxShadow: 4, px: 4, py: 1.5, fontWeight: 700 }}
                >
                  View Document
                </Button>
              </Box>
            ) : (
              <iframe 
                src={`${blobUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
                width="100%" 
                height="100%" 
                style={{ border: 'none', background: '#fff', flex: 1 }}
                title="Secure Document Viewer"
                onContextMenu={(e) => e.preventDefault()}
              />
            )}

            {isMobile && (
              <Box sx={{ 
                position: 'absolute', 
                bottom: 16, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 20
              }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="small" 
                  onClick={handleOpenNewTab}
                  sx={{ borderRadius: 4, boxShadow: 4, px: 3, whiteSpace: 'nowrap', fontWeight: 700 }}
                >
                  Full Screen
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SecurePdfViewer;
