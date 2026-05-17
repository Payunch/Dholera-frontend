import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Updates from './pages/Updates';
import Investment from './pages/Investment';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLeads from './pages/admin/AdminLeads';
import AdminUpdates from './pages/admin/AdminUpdates';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminLogin from './pages/admin/AdminLogin';
import ProfessionalPortal from './pages/professional/Dashboard';
import ClearanceEngine from './pages/clearance/ClearanceEngine';

import ScrollToTop from './components/ScrollToTop';
import { useVisitorTracking } from './hooks/useVisitorTracking';
import LeadPopup from './components/LeadPopup';
import { LeadProvider } from './context/LeadContext';
import { LanguageProvider } from './context/LanguageContext';
import { API_BASE_URL } from './utils/apiBase';

/**
 * Protected route wrapper for Admin pages.
 * Ensures only authenticated admins can access.
 */
const ProtectedAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE_URL}/auth/me`, { credentials: 'include' })
      .then(res => {
        if (!mounted) return;
        setOk(res.ok);
      })
      .catch(() => {
        if (mounted) setOk(false);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) return null;
  if (!ok) return <Navigate to="/admin/login" replace />;
  return children;
};

/**
 * Main application content wrapper.
 * Manages tracking and global popups.
 */
function AppContent() {
  const { sessionId, fingerprint } = useVisitorTracking();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <LeadPopup sessionId={sessionId} fingerprint={fingerprint} />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="updates" element={<Updates />} />
          <Route path="updates/:id" element={<Updates />} />
          <Route path="investment" element={<Investment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="professional/dashboard" element={<ProfessionalPortal />} />
          <Route path="clearance-engine/*" element={<ClearanceEngine />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="updates" element={<AdminUpdates />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
    </>
  );
}

/**
 * Root App component providing global context providers.
 */
function App() {
  return (
    <LanguageProvider>
      <LeadProvider>
        <AppContent />
      </LeadProvider>
    </LanguageProvider>
  );
}

export default App;
