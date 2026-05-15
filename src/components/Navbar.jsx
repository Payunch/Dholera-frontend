import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, Chip, Tooltip, Menu, MenuItem, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import VerifiedIcon from '@mui/icons-material/Verified';
import LanguageIcon from '@mui/icons-material/Language';
import { useLead } from '../context/LeadContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { verifiedLead } = useLead();
  const { lang, setLang, t } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenLangMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseLangMenu = () => setAnchorEl(null);
  const handleLangSelect = (newLang) => {
    setLang(newLang);
    handleCloseLangMenu();
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'gu', label: 'ગુજરાતી' }
  ];

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mr: 2,
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Dholera Portal Logo"
              sx={{ height: 32, mr: 1.5 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 800,
                color: 'primary.main',
                letterSpacing: '-0.5px'
              }}
            >
              DHOLERA PORTAL
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            <Button component={RouterLink} to="/" sx={{ color: 'text.primary', fontWeight: 600 }}>{t('nav_home')}</Button>
            <Button component={RouterLink} to="/updates" sx={{ color: 'text.primary', fontWeight: 600 }}>{t('nav_updates')}</Button>
            <Button component={RouterLink} to="/planning" sx={{ color: 'text.primary', fontWeight: 600 }}>{t('nav_planning')}</Button>
            <Button component={RouterLink} to="/investment" sx={{ color: 'text.primary', fontWeight: 600 }}>{t('nav_investment')}</Button>
            
            <Tooltip title="Change Language">
              <IconButton onClick={handleOpenLangMenu} sx={{ ml: 1, color: 'primary.main' }}>
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLangMenu}
              PaperProps={{ sx: { borderRadius: 3, mt: 1, boxShadow: 4 } }}
            >
              {languages.map((l) => (
                <MenuItem 
                  key={l.code} 
                  onClick={() => handleLangSelect(l.code)}
                  selected={lang === l.code}
                  sx={{ fontWeight: 600, px: 3 }}
                >
                  {l.label}
                </MenuItem>
              ))}
            </Menu>

            {verifiedLead ? (
              <Tooltip title={`Verified: ${verifiedLead.name}`}>
                <Chip 
                  avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{verifiedLead.name?.charAt(0)}</Avatar>}
                  label="Verified Investor"
                  variant="outlined"
                  color="secondary"
                  icon={<VerifiedIcon />}
                  sx={{ fontWeight: 700, px: 1 }}
                />
              </Tooltip>
            ) : (
              <Button component={RouterLink} to="/contact" variant="contained" color="primary" sx={{ borderRadius: 8, ml: 2, fontWeight: 700 }}>
                {t('nav_contact')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
