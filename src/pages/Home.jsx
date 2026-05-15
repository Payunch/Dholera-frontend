import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import FactoryIcon from '@mui/icons-material/Factory';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import { TripleSplitImage } from '../components/DynamicImages';

const Home = () => {
  const { t } = useLanguage();
  const galleryIndices = [1, 2, 3];

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
        py: { xs: 10, md: 15 },
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
              Get in Touch
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' } }} component={RouterLink} to="/updates">
              Read Blogs
            </Button>
          </Stack>

          {/* PDF Quick Access Section */}
          <Box sx={{ mt: 8, p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 2 }}>
              Secure Document Access
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {[
                { label: 'Official PDFs', icon: <DescriptionIcon />, color: '#fff', path: '/planning?tab=0' },
                { label: 'Naksha Maps', icon: <LayersIcon />, color: '#fff', path: '/planning?tab=1' },
                { label: 'DP Maps', icon: <MapIcon />, color: '#fff', path: '/planning?tab=2' },
              ].map((pdf, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    component={RouterLink}
                    to={pdf.path}
                    startIcon={pdf.icon}
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      color: 'white', 
                      py: 2, 
                      fontWeight: 700,
                      borderRadius: 2,
                      '&:hover': { bgcolor: 'secondary.main', color: 'primary.dark' }
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

      {/* Infrastructure Metrics */}
      <Container maxWidth="xl" sx={{ mt: -6, position: 'relative', zIndex: 3, mb: 10 }}>
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
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: 'primary.main' }}>
          Project Gallery
        </Typography>
        <Grid container spacing={3}>
          {galleryIndices.map((idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <TripleSplitImage index={idx} height={260} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
