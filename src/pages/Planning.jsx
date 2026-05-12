import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Tabs, Tab, Paper, Breadcrumbs, Link, Skeleton } from '@mui/material';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SecurePdfViewer from '../components/SecurePdfViewer';
import LeadPopup from '../components/LeadPopup';
import { useVisitorTracking } from '../hooks/useVisitorTracking';
import { useLead } from '../context/LeadContext';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../utils/apiBase';
import Seo from '../components/Seo';

const Planning = () => {
  const { verifiedLead } = useLead();
  const { t } = useLanguage();
  const [pdfs, setPdfs] = useState([]);
  const [loadingPdfs, setLoadingPdfs] = useState(true);
  const [pdfLoadError, setPdfLoadError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [visibleCount, setVisibleCount] = useState({ 0: 8, 1: 8, 2: 8 });
  const [selectedPdfId, setSelectedPdfId] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [search, setSearch] = useState('');
  const { sessionId, fingerprint } = useVisitorTracking();

  useEffect(() => {
    let active = true;

    const loadPdfs = async () => {
      setLoadingPdfs(true);
      setPdfLoadError('');

      try {
        const res = await fetch(`${API_BASE_URL}/pdf/list`);
        if (!res.ok) {
          throw new Error(`Failed to load documents (${res.status})`);
        }

        const data = await res.json();
        if (!active) {
          return;
        }

        const apiPdfs = Array.isArray(data) ? data : [];
        setPdfs(apiPdfs);
      } catch (error) {
        if (!active) {
          return;
        }
        console.error('PDF list load error:', error);
        setPdfLoadError('Documents could not be loaded right now. Please try again shortly.');
      } finally {
        if (active) {
          setLoadingPdfs(false);
        }
      }
    };

    loadPdfs();

    return () => {
      active = false;
    };
  }, []);

  const categories = ['Official PDFs', 'Naksha', 'DP Maps'];
  
  const filteredPdfs = pdfs.filter(pdf => {
    if (activeTab === 0) return pdf.category === 'PDFs';
    if (activeTab === 1) return pdf.category === 'Naksha';
    if (activeTab === 2) return pdf.category === 'DP Maps';
    return false;
  }).filter((pdf) => {
    if (!search) return true;
    const haystack = `${pdf.title || ''} ${pdf.category || ''}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const handlePdfClick = (pdfId) => {
    setSelectedPdfId(pdfId);
    if (verifiedLead) {
      setShowViewer(true);
    } else {
      setShowVerifyPopup(true);
    }
  };

  const handleVerifySuccess = () => {
    setShowVerifyPopup(false);
    setShowViewer(true);
  };

  const handleShowMore = () => {
    setVisibleCount(prev => ({
      ...prev,
      [activeTab]: prev[activeTab] + 8
    }));
  };

  return (
    <Box sx={{ pt: 12, pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Seo
        title={t('nav_planning')}
        description="Search Dholera planning documents, Naksha maps, and DP maps with secure lead-gated viewing."
        path="/planning"
      />
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Typography color="text.primary">{t('nav_planning')}</Typography>
          <Typography color="secondary.main" sx={{ fontWeight: 700 }}>{categories[activeTab]}</Typography>
        </Breadcrumbs>

        <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
          {t('nav_planning')}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Access official blueprints and development documents for Dholera Smart City.
        </Typography>

        <TextField
          fullWidth
          label={t('search_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4, maxWidth: 480 }}
        />

        <Paper sx={{ mb: 6, borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, val) => setActiveTab(val)} 
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            sx={{ 
              bgcolor: 'white',
              '& .MuiTab-root': { py: 3, fontSize: '1.1rem', transition: '0.2s' },
              '& .Mui-selected': { bgcolor: 'rgba(0,0,0,0.02)' }
            }}
          >
            <Tab label="Official PDFs" icon={<PictureAsPdfIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
            <Tab label="Naksha (TP Maps)" icon={<PictureAsPdfIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
            <Tab label="DP Maps" icon={<PictureAsPdfIcon />} iconPosition="start" sx={{ fontWeight: 700 }} />
          </Tabs>
        </Paper>

        <Grid container spacing={4}>
          {loadingPdfs ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ borderRadius: 4 }}>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent sx={{ p: 2.5 }}>
                    <Skeleton width="40%" sx={{ mb: 1 }} />
                    <Skeleton width="90%" height={24} sx={{ mb: 2 }} />
                    <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : filteredPdfs.slice(0, visibleCount[activeTab]).map((pdf) => (
            <Grid item xs={12} sm={6} md={3} key={pdf.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: 4, 
                transition: '0.3s', 
                border: '1px solid #eee',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6, borderColor: 'secondary.main' } 
              }}>
                <Box sx={{ bgcolor: 'grey.50', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <PictureAsPdfIcon sx={{ fontSize: 60, color: 'text.disabled', opacity: 0.3 }} />
                  {!verifiedLead && (
                    <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'secondary.main', borderRadius: '50%', p: 1, display: 'flex', boxShadow: 2 }}>
                      <LockIcon sx={{ color: 'white', fontSize: 16 }} />
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                    {pdf.category.toUpperCase()}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, mt: 1, mb: 2, minHeight: '3em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {pdf.title}
                  </Typography>
                  <Button 
                    variant={verifiedLead ? "outlined" : "contained"} 
                    fullWidth 
                    size="small"
                    startIcon={verifiedLead ? <PictureAsPdfIcon /> : <LockIcon />}
                    onClick={() => handlePdfClick(pdf.id)}
                    sx={{ borderRadius: 2, fontWeight: 700, py: 1 }}
                  >
                    {verifiedLead ? t('btn_view') : t('btn_unlock')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {!loadingPdfs && filteredPdfs.length > visibleCount[activeTab] && (
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large" 
              onClick={handleShowMore}
              sx={{ borderRadius: 3, px: 6, fontWeight: 800 }}
            >
              Load More {categories[activeTab]}
            </Button>
          </Box>
        )}

        {!loadingPdfs && !pdfLoadError && filteredPdfs.length === 0 && (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h6" color="text.disabled">No documents available in this category.</Typography>
          </Box>
        )}

        {!loadingPdfs && pdfLoadError && (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h6" color="error.main">{pdfLoadError}</Typography>
          </Box>
        )}
      </Container>

      {/* Mandatory Verification Popup */}
      {showVerifyPopup && (
        <LeadPopup 
          sessionId={sessionId} 
          fingerprint={fingerprint} 
          compulsory={true} 
          onSuccess={handleVerifySuccess} 
        />
      )}

      {/* Secure Viewer */}
      {showViewer && selectedPdfId && (
        <SecurePdfViewer pdfId={selectedPdfId} onClose={() => setShowViewer(false)} />
      )}
    </Box>
  );
};

export default Planning;
