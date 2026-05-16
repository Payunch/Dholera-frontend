import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CoSignatoryManager } from '../CoSignatoryManager';
import { ExtensionRequestDialog } from '../ExtensionRequestDialog';

const ACTIVE_PROJECTS = [
  {
    id: 'DS-2026-042',
    name: 'Sector 4 High-Rise Complex',
    status: 'Plinth Level Inspection',
    progress: 1,
    validity: '342 days left',
    lastUpdate: '2 days ago',
    collaboration: true,
  },
  {
    id: 'DS-2026-089',
    name: 'Industrial Unit - Zone 2',
    status: 'Final Finishing',
    progress: 3,
    validity: '24 days left',
    lastUpdate: 'Today',
    collaboration: false,
    needsExtension: true,
  },
];

const INSPECTION_STAGES = ['Foundation', 'Plinth Level', 'Mid-Story', 'Occupancy Cert'];

export const ProfessionalDashboard: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [extensionDialog, setExtensionDialog] = useState<{ open: boolean; projectId: string }>({ open: false, projectId: '' });

  return (
    <Box sx={{ py: 6 }}>
      {/* Dashboard Header */}
      <Grid container spacing={3} sx={{ mb: 6 }} alignItems="center">
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'var(--color-brand-primary)',
                boxShadow: 'var(--shadow-resting)',
              }}
            >
              <BusinessIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'var(--color-brand-primary)', mb: 0.5 }}>
                Dholera Dev Group Ltd.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<VerifiedUserIcon sx={{ fontSize: '1rem !important' }} />}
                  label="Registered Architect (Class A)"
                  size="small"
                  sx={{ bgcolor: 'emerald.50', color: 'var(--color-status-success)', fontWeight: 800 }}
                />
                <Chip
                  label="License: DSIRDA-ARC-2026-442"
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
          <Button
            variant="contained"
            startIcon={<NotificationsActiveIcon />}
            sx={{
              bgcolor: 'var(--color-brand-accent)',
              borderRadius: 'var(--radius-interactive)',
              fontWeight: 800,
              px: 3,
            }}
          >
            2 Compliance Alerts
          </Button>
        </Grid>
      </Grid>

      {/* Stats Summary */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { label: 'Active Clearances', value: '14', color: 'var(--color-brand-primary)' },
          { label: 'Inspections Pending', value: '03', color: 'var(--color-status-warning)' },
          { label: 'Extensions Req', value: '01', color: 'var(--color-status-error)' },
          { label: 'Total FSI Used', value: '1.45 Lakh sq.m', color: 'var(--color-brand-secondary)' },
        ].map((stat, idx) => (
          <Grid item xs={6} md={3} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 'var(--radius-container)',
                border: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: stat.color, mt: 0.5 }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Active Project Tracker */}
      <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--color-brand-primary)', mb: 3 }}>
        Active Submission Pipeline
      </Typography>

      <Stack spacing={3}>
        {ACTIVE_PROJECTS.map((project) => (
          <Card
            key={project.id}
            elevation={0}
            sx={{
              borderRadius: 'var(--radius-container)',
              border: '1px solid',
              borderColor: project.needsExtension ? 'var(--color-status-error)' : 'divider',
              overflow: 'visible',
              transition: 'all 0.2s ease',
              '&:hover': { transform: 'scale(1.005)', boxShadow: 'var(--shadow-hover)' },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid', borderColor: 'grey.50' }}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--color-brand-accent)' }}>
                      REF ID: {project.id}
                    </Typography>
                    {project.needsExtension && (
                      <Chip label="Expiry Warning" size="small" color="error" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 900 }} />
                    )}
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)' }}>
                    {project.name}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, color: project.needsExtension ? 'var(--color-status-error)' : 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 14 }} /> {project.validity}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, color: 'text.secondary' }}>
                      Last Update: {project.lastUpdate}
                    </Typography>
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    startIcon={expandedProject === project.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                  >
                    Collaboration
                  </Button>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </Box>

              <Collapse in={expandedProject === project.id}>
                <Box sx={{ px: 3, pb: 3 }}>
                  <CoSignatoryManager />
                </Box>
              </Collapse>

              <Box sx={{ p: 3, bgcolor: 'var(--color-brand-background)' }}>
                <Stepper activeStep={project.progress} alternativeLabel>
                  {INSPECTION_STAGES.map((label) => (
                    <Step key={label}>
                      <StepLabel>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.7rem' }}>{label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {project.needsExtension && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => setExtensionDialog({ open: true, projectId: project.id })}
                    sx={{ borderRadius: 1.5, fontWeight: 800, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                  >
                    Apply for Extension
                  </Button>
                )}
                <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: 1.5, fontWeight: 700 }}>
                  Form D Permission
                </Button>
                <Button variant="contained" size="small" sx={{ borderRadius: 1.5, fontWeight: 800, bgcolor: 'var(--color-brand-primary)' }}>
                  Submit Sec 5.2.1 Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <ExtensionRequestDialog
        open={extensionDialog.open}
        projectId={extensionDialog.projectId}
        onClose={() => setExtensionDialog({ ...extensionDialog, open: false })}
      />
    </Box>
  );
};
