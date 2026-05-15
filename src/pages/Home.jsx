import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Paper, Stack, Skeleton, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import FactoryIcon from '@mui/icons-material/Factory';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import LockIcon from '@mui/icons-material/Lock';

import Seo from '../components/Seo';
import SecurePdfViewer from '../components/SecurePdfViewer';
import LeadPopup from '../components/LeadPopup';
import { useVisitorTracking } from '../hooks/useVisitorTracking';
import { useLead } from '../context/LeadContext';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../utils/apiBase';
import { TripleSplitImage } from '../components/DynamicImages';

const Home = () => {
  const { verifiedLead } = useLead();
  const { t } = useLanguage();
  const galleryIndices = [1, 2, 3];
  const { sessionId, fingerprint } = useVisitorTracking();

  // PDF Listing State
  const [pdfs, setPdfs] = useState([]);
  const [loadingPdfs, setLoadingPdfs] = useState(true);
  const [pdfLoadError, setPdfLoadError] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 0: Official, 1: Naksha, 2: DP Maps
  const [visibleCount, setVisibleCount] = useState({ 0: 8, 1: 8, 2: 8 });
  const [selectedPdfId, setSelectedPdfId] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let active = true;
    const loadPdfs = async () => {
      setLoadingPdfs(true);
      setPdfLoadError('');
      try {
        const res = await fetch(`${API_BASE_URL}/pdf/list`);
        if (!res.ok) throw new Error(`Failed to load documents (${res.status})`);
        const data = await res.json();
        if (active) setPdfs(Array.isArray(data) ? data : []);
      } catch (error) {
        if (active) {
          console.error('PDF list load error:', error);
          setPdfLoadError('Documents could not be loaded right now.');
        }
      } finally {
        if (active) setLoadingPdfs(false);
      }
    };
    loadPdfs();
    return () => { active = false; };
  }, []);

  const categories = [t('pdf_cat_official'), t('pdf_cat_naksha'), t('pdf_cat_dp')];
  
  const filteredPdfs = pdfs.filter(pdf => {
    const cat = (pdf.category || '').toLowerCase();
    if (activeTab === 0) return cat.includes('pdf') || cat.includes('brochure') || cat.includes('legal') || cat.includes('general');
    if (activeTab === 1) return cat.includes('naksha') || cat.includes('tp');
    if (activeTab === 2) return cat.includes('dp') || cat.includes('map');
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
    setVisibleCount(prev => ({ ...prev, [activeTab]: prev[activeTab] + 8 }));
  };

  return (
    <Box>
      <Seo
        title={t('nav_home')}
        description="Dholera growth evidence, planning maps, and verified lead capture in one portal."
        path="/"
      />
      
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        bgcolor: 'primary.dark',
        color: 'white',
        pt: { xs: 12, md: 15 },
        pb: { xs: 10, md: 12 },
        overflow: 'hidden',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0a3d62 0%, #3c6382 100%)'
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h1" sx={{ mb: 3, fontWeight: 800, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            {t('hero_title')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 5, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
            {t('hero_subtitle')}
          </Typography>
          
          {/* Main Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/contact" sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2 }}>
              {t('btn_get_touch')}
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' } }} component={RouterLink} to="/updates">
              Read Blogs
            </Button>
          </Stack>

          {/* PDF Quick Access Category Selection */}
          <Box sx={{ mt: 8, p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 2 }}>
              {t('footer_contact_info')}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {[
                { label: t('pdf_cat_official'), icon: <DescriptionIcon />, id: 0 },
                { label: t('pdf_cat_naksha'), icon: <LayersIcon />, id: 1 },
                { label: t('pdf_cat_dp'), icon: <MapIcon />, id: 2 },
              ].map((pdf) => (
                <Grid item xs={12} sm={4} key={pdf.id}>
                  <Button 
                    fullWidth 
                    variant={activeTab === pdf.id ? "contained" : "outlined"}
                    color={activeTab === pdf.id ? "secondary" : "inherit"}
                    onClick={() => {
                      setActiveTab(pdf.id);
                      const el = document.getElementById('document-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    startIcon={pdf.icon}
                    sx={{ 
                      py: 2, 
                      fontWeight: 700,
                      borderRadius: 2,
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: activeTab === pdf.id ? 'primary.dark' : 'white',
                      '&:hover': { bgcolor: 'secondary.main', color: 'primary.dark', borderColor: 'secondary.main' }
                    }}
                  >
                    {pdf.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Document Listing Section */}
      <Box id="document-section" sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 6, gap: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                {categories[activeTab]}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Browsing {filteredPdfs.length} verified documents
              </Typography>
            </Box>
            <TextField
              size="small"
              placeholder={t('search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: '100%', md: 350 }, bgcolor: 'white', borderRadius: 2 }}
            />
          </Box>

          <Grid container spacing={4}>
            {loadingPdfs ? (
              Array.from({ length: 4 }).map((_, i) => (
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
            ) : filteredPdfs.length > 0 ? (
              filteredPdfs.slice(0, visibleCount[activeTab]).map((pdf) => (
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
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ py: 10, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.disabled">No documents available in this category.</Typography>
                </Box>
              </Grid>
            )}
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
                Load More Documents
              </Button>
            </Box>
          )}

          {!loadingPdfs && pdfLoadError && (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography variant="h6" color="error.main">{pdfLoadError}</Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Infrastructure Metrics */}
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Grid container spacing={3} justifyContent="center">
          {[
            { title: '920 Sq. Km', desc: 'Total Development Area', icon: <MapIcon fontSize="large" color="primary" /> },
            { title: 'DMIC Corridor', desc: 'Direct Connectivity', icon: <FactoryIcon fontSize="large" color="primary" /> },
            { title: 'International Airport', desc: 'Under Construction', icon: <FlightTakeoffIcon fontSize="large" color="primary" /> },
          ].map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(10, 61, 98, 0.05)', borderRadius: '50%', mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>{item.title}</Typography>
                <Typography variant="body1" color="text.secondary">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 10 }}>
        {/* <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: 'primary.main' }}>
          Project Gallery
        </Typography> */}
        <Grid container spacing={3}>
          {galleryIndices.map((idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <TripleSplitImage index={idx} height={260} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Verification & Viewer Popups */}
      {showVerifyPopup && (
        <LeadPopup 
          sessionId={sessionId} 
          fingerprint={fingerprint} 
          compulsory={true} 
          onSuccess={handleVerifySuccess} 
        />
      )}
      {showViewer && selectedPdfId && (
        <SecurePdfViewer pdfId={selectedPdfId} onClose={() => setShowViewer(false)} />
      )}
    </Box>
  );
};

export default Home;
