import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, IconButton, Paper, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { API_BASE_URL } from '../utils/apiBase';

const SecurePdfViewer = ({ pdfId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use localStorage values directly to ensure we have the latest after verification
  const leadPhone = localStorage.getItem('lead_phone') || 'VERIFIED';
  const leadEmail = localStorage.getItem('lead_email') || 'VERIFIED';
  const token = localStorage.getItem('lead_token');

  useEffect(() => {
    if (!pdfId) {
      setError('Invalid document ID');
      setLoading(false);
      return;
    }

    const verifyAccess = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!token) throw new Error('Verification required to access this document.');

        const res = await fetch(`${API_BASE_URL}/pdf/view/${pdfId}`, {
          headers: { 'Authorization': token }
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({ error: 'Server error' }));
          throw new Error(errData.error || `Failed to load document (${res.status})`);
        }
      } catch (err) {
        console.error('SecurePdfViewer Verify Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, [pdfId, token]);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const directUrl = `${API_BASE_URL}/pdf/view/${pdfId}?token=${token}`;

  const handleOpenNewTab = () => {
    if (directUrl) {
      window.open(directUrl, '_blank');
    }
  };

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: isMobile ? 1 : 2, display: 'flex', justifyContent: 'flex-end', bgcolor: '#1e1e1e', gap: 2, alignItems: 'center' }}>
        {!loading && !error && (
          <Button 
            variant="contained" 
            color="secondary" 
            size="small" 
            onClick={handleOpenNewTab}
            sx={{ fontWeight: 700 }}
          >
            {isMobile ? 'View Full Screen' : 'Open in New Tab'}
          </Button>
        )}
        <IconButton color="error" onClick={onClose} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: isMobile ? 2 : 2 }}>
        {loading && <CircularProgress color="primary" />}
        {error && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff', borderRadius: 4, maxWidth: 400 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 2 }}>Access Denied</Typography>
            <Typography color="text.secondary" variant="body1" sx={{ mb: 3 }}>{error}</Typography>
            <Button variant="contained" onClick={onClose}>Close Viewer</Button>
          </Paper>
        )}
        {!loading && !error && (
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
            {/* Tiled Watermark */}
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
            
            <iframe 
              src={`${directUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
              width="100%" 
              height="100%" 
              style={{ border: 'none', background: '#fff', flex: 1 }}
              title="Secure Document Viewer"
              onContextMenu={(e) => e.preventDefault()}
            />

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
                  color="primary" 
                  size="small" 
                  onClick={handleOpenNewTab}
                  startIcon={<PictureAsPdfIcon />}
                  sx={{ borderRadius: 4, boxShadow: 4, px: 3, whiteSpace: 'nowrap' }}
                >
                  Open Full Screen
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
