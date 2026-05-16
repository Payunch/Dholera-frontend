import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, Avatar, 
  Chip, Tooltip, Menu, MenuItem, IconButton, Drawer, 
  List, ListItem, ListItemText, ListItemIcon, Divider 
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import VerifiedIcon from '@mui/icons-material/Verified';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useLead } from '../context/LeadContext';
import { useLanguage } from '../context/LanguageContext';
import { fullLogo } from '../config/branding';

const Navbar = () => {
  const { verifiedLead } = useLead();
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenLangMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseLangMenu = () => setAnchorEl(null);
  const handleLangSelect = (newLang) => {
    setLang(newLang);
    handleCloseLangMenu();
  };

  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'gu', label: 'ગુજરાતી' }
  ];

  const navItems = [
    { label: t('nav_home'), path: '/', icon: <HomeIcon /> },
    { label: 'Blogs', path: '/updates', icon: <ArticleIcon /> },
    { label: t('nav_contact'), path: '/contact', icon: <ContactSupportIcon /> }
  ];

  const renderLangSwitcher = (isMobile = false) => (
    <Box sx={{ ml: isMobile ? 0 : 2, display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Select Language">
        <IconButton 
          onClick={handleOpenLangMenu} 
          sx={{ 
            color: 'primary.main', 
            border: isMobile ? 'none' : '1px solid', 
            borderColor: 'divider',
            p: isMobile ? 0 : 1
          }}
        >
          <LanguageIcon />
          {isMobile && <Typography sx={{ ml: 1, fontWeight: 700 }}>Language</Typography>}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLangMenu}
        PaperProps={{ sx: { borderRadius: 3, mt: 1, boxShadow: 4, minWidth: 150 } }}
      >
        {languages.map((l) => (
          <MenuItem 
            key={l.code} 
            onClick={() => handleLangSelect(l.code)}
            selected={lang === l.code}
            sx={{ fontWeight: 600, py: 1.5 }}
          >
            {l.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* ── Brand Logo ── */}
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 2 }}
            >
              <Box
                component="img"
                src={fullLogo}
                alt="Dholera Logo"
                sx={{ height: { xs: 36, md: 48 }, width: 'auto', mr: 1.5 }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'Manrope',
                  fontWeight: 800,
                  color: 'primary.main',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  letterSpacing: '-0.5px'
                }}
              >
                dholera platform
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />

            {/* ── Desktop Menu ── */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.path}
                  component={RouterLink} 
                  to={item.path} 
                  sx={{ 
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary', 
                    fontWeight: 700,
                    px: 2
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {renderLangSwitcher()}

              {verifiedLead ? (
                <Chip 
                  avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{verifiedLead.name?.charAt(0)}</Avatar>}
                  label="Verified"
                  variant="outlined"
                  color="secondary"
                  icon={<VerifiedIcon />}
                  sx={{ fontWeight: 700, ml: 1 }}
                />
              ) : (
                <Button component={RouterLink} to="/contact" variant="contained" color="primary" sx={{ borderRadius: 8, ml: 1, px: 3, fontWeight: 700 }}>
                  Contact Us
                </Button>
              )}
            </Box>

            {/* ── Mobile Toggle ── */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleMobileDrawer} color="primary">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Box component="img" src={fullLogo} sx={{ height: 40 }} />
        </Box>
        
        <List>
          {navItems.map((item) => (
            <ListItem 
              button 
              key={item.path} 
              component={RouterLink} 
              to={item.path} 
              onClick={toggleMobileDrawer}
              sx={{ borderRadius: 2, mb: 1, color: location.pathname === item.path ? 'primary.main' : 'inherit' }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ px: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
            Preferences
          </Typography>
          {renderLangSwitcher(true)}
        </Box>

        <Box sx={{ mt: 'auto', pt: 4 }}>
          {verifiedLead ? (
            <Chip 
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{verifiedLead.name?.charAt(0)}</Avatar>}
              label="Verified Investor"
              fullWidth
              variant="contained"
              color="secondary"
              icon={<VerifiedIcon />}
              sx={{ fontWeight: 700, py: 3, borderRadius: 2 }}
            />
          ) : (
            <Button 
              component={RouterLink} 
              to="/contact" 
              variant="contained" 
              fullWidth 
              onClick={toggleMobileDrawer}
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
            >
              Contact Us
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
