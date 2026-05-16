import React from 'react';
import { Box, Container, Typography, Grid, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { siteContact } from '../data/siteContact';
import { useLanguage } from '../context/LanguageContext';
import { SplitLogo } from './DynamicImages';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', py: 8, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand & About */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SplitLogo isFull={false} height={45} />
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                {siteContact.brandName}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 350 }}>
              {t('footer_tagline')}
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: 'secondary.main' }}>
              {t('footer_quick_links')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' } }}>{t('nav_home')}</Link>
              <Link component={RouterLink} to="/updates" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' } }}>{t('nav_updates')}</Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' } }}>{t('nav_contact')}</Link>
              <Link component={RouterLink} to="/terms-and-conditions" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' } }}>Terms & Conditions</Link>
              <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' } }}>Privacy Policy</Link>
            </Box>
          </Grid>

          {/* Owner & Contact Details */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: 'secondary.main' }}>
              {t('footer_owner')}
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonIcon sx={{ color: 'secondary.main' }} />
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{siteContact.operatorName}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ color: 'secondary.main' }} />
                <Link href={`mailto:${siteContact.email}`} color="inherit" underline="hover">
                  {siteContact.email}
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon sx={{ color: 'secondary.main' }} />
                <Link href={`tel:${siteContact.phoneE164}`} color="inherit" underline="hover">
                  {siteContact.phoneDisplay}
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} {siteContact.brandName.toUpperCase()}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
