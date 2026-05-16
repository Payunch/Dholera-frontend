import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Container,
  TextField,
  Grid,
  CircularProgress,
  Fade,
} from '@mui/material';
import { FeeCalculator } from '../FeeCalculator';
import { PlanColorKey } from '../PlanColorKey';
import { DocumentDropZone } from '../DocumentDropZone';
import { RiskMapping } from '../RiskMapping';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const steps = [
  { label: 'Project Config', icon: <RocketLaunchIcon /> },
  { label: 'Compliance Audit', icon: <AssignmentTurnedInIcon /> },
  { label: 'Filer Registration', icon: <PersonAddIcon /> },
];

export const PreScreeningWizard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveStep(steps.length);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fade in={activeStep === 0}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>
                Define your project's target sector and spatial footprint to initialize the DSIRDA verification logic.
              </Typography>
              <RiskMapping hideHeader />
              <Box sx={{ my: 4 }} />
              <FeeCalculator hideHeader />
            </Box>
          </Fade>
        );
      case 1:
        return (
          <Fade in={activeStep === 1}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>
                Review structural compliance flags and cross-reference your plan sets with official Section 2.4 color swatches.
              </Typography>
              <PlanColorKey />
              <Box sx={{ my: 4 }} />
              <DocumentDropZone hideHeader />
              <Box sx={{ mt: 4, p: 3, bgcolor: 'var(--color-brand-background)', borderRadius: 'var(--radius-interactive)', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: 'var(--color-brand-primary)' }}>
                  Structural Readiness Checklist:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  • Plot boundaries match Core Lot outlines (Solid Black)<br />
                  • Setbacks validated against road-existing buffers (Forest Green)<br />
                  • Drainage paths marked correctly (Dotted Crimson)
                </Typography>
              </Box>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Fade in={activeStep === 2}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>
                Lock-in your clearance estimates and register as a certified DSIRDA professional to proceed with formal filing.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Professional Name"
                    name="name"
                    value={leadInfo.name}
                    onChange={handleLeadChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Business Email Address"
                    name="email"
                    type="email"
                    value={leadInfo.email}
                    onChange={handleLeadChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    name="phone"
                    value={leadInfo.phone}
                    onChange={handleLeadChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Architectural/Dev Firm"
                    name="company"
                    value={leadInfo.company}
                    onChange={handleLeadChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, p: 2, bgcolor: 'info.dark', color: 'white', borderRadius: 'var(--radius-interactive)', display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssignmentTurnedInIcon />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  By registering, you confirm your adherence to Section 2.8 anti-fraud compliance protocols.
                </Typography>
              </Box>
            </Box>
          </Fade>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 'var(--radius-container)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'var(--shadow-resting)',
        }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: 'var(--color-brand-primary)',
              fontFamily: 'var(--font-interface-headings)',
              mb: 1,
              letterSpacing: '-0.03em',
            }}
          >
            Digital Clearance Pre-Screening Wizard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Automated verification pipeline for DSIRDA development permissions.
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 8 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: activeStep >= index ? 'var(--color-brand-accent) !important' : 'divider',
                    '& .MuiStepIcon-text': { fill: 'white' },
                  },
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 400 }}>
          {activeStep === steps.length ? (
            <Fade in={true}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'var(--color-status-success)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'var(--color-brand-primary)' }}>
                  Pre-Screening Audit Complete
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500, mx: 'auto' }}>
                  Your project models have been validated against the latest GDCR parameters. An official fee estimation and document checklist has been sent to your email.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setActiveStep(0)}
                  sx={{
                    bgcolor: 'var(--color-brand-primary)',
                    borderRadius: 'var(--radius-interactive)',
                    px: 6,
                    fontWeight: 800,
                  }}
                >
                  Start New Evaluation
                </Button>
              </Box>
            </Fade>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                  disabled={activeStep === 0 || isSubmitting}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  sx={{ fontWeight: 700, color: 'text.secondary' }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                  sx={{
                    bgcolor: 'var(--color-brand-accent)',
                    color: 'white',
                    borderRadius: 'var(--radius-interactive)',
                    px: 4,
                    fontWeight: 800,
                    '&:hover': {
                      bgcolor: 'var(--color-brand-secondary)',
                    },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Activate Filer Profile' : 'Proceed to Compliance Audit'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
