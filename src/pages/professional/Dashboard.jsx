import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { ProfessionalDashboard } from '../../components/ProfessionalDashboard';
import Seo from '../../components/Seo';

const ProfessionalPortal = () => {
  return (
    <Container maxWidth="lg">
      <Seo
        title="Professional Developer Portal | DSIRDA"
        description="Manage your Dholera construction clearances, track inspection progress, and handle permit extensions."
        path="/professional/dashboard"
      />
      <ProfessionalDashboard />
    </Container>
  );
};

export default ProfessionalPortal;
