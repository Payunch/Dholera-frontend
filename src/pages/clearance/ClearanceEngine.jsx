import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Stack,
  Button,
} from '@mui/material';
import { FeeCalculator } from '../../components/FeeCalculator';
import { ParkingPlanner } from '../../components/ParkingPlanner';
import { RiskMapping } from '../../components/RiskMapping';
import { DocumentDropZone } from '../../components/DocumentDropZone';
import Seo from '../../components/Seo';
import CalculateIcon from '@mui/icons-material/Calculate';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MapIcon from '@mui/icons-material/Map';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ClearanceEngine = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Seo
        title="Project Clearance & Estimation Engine | DSIRDA"
        description="Verify spatial compliance, calculate parking ECS, and estimate verification fees for Dholera smart city projects."
        path="/clearance-engine"
      />

      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: 'var(--color-brand-primary)', mb: 2 }}>
          Spatial Intelligence Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
          Configure your project parameters to meet strict DSIRDA structural guidelines. Achieve total clearance certainty before spending capital.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 'var(--radius-container)',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="fullWidth"
          sx={{
            bgcolor: 'var(--color-brand-background)',
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTabs-indicator': { height: 4, borderRadius: '4px 4px 0 0' },
          }}
        >
          <Tab icon={<CalculateIcon />} label="Fee Engine" sx={{ fontWeight: 800, py: 3 }} />
          <Tab icon={<LocalParkingIcon />} label="Parking Planner" sx={{ fontWeight: 800, py: 3 }} />
          <Tab icon={<MapIcon />} label="Zoning Map" sx={{ fontWeight: 800, py: 3 }} />
          <Tab icon={<CloudUploadIcon />} label="Plan Drop" sx={{ fontWeight: 800, py: 3 }} />
        </Tabs>

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {activeTab === 0 && <FeeCalculator />}
          {activeTab === 1 && <ParkingPlanner />}
          {activeTab === 2 && <RiskMapping />}
          {activeTab === 3 && <DocumentDropZone />}
        </Box>
      </Paper>

      <Box sx={{ p: 4, bgcolor: 'var(--color-brand-primary)', borderRadius: 'var(--radius-container)', color: 'white', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
          Ready to submit your formal application?
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, maxWidth: 600, mx: 'auto' }}>
          Lock-in your spatial models and transition seamlessly to an authorized DSIRDA filer profile.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'var(--color-brand-accent)',
            color: 'white',
            fontWeight: 800,
            borderRadius: 'var(--radius-interactive)',
            px: 6,
          }}
        >
          Create Professional Profile
        </Button>
      </Box>
    </Container>
  );
};

export default ClearanceEngine;
