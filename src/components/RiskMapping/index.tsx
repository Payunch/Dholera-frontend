import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import WaterIcon from '@mui/icons-material/Water';
import TerrainIcon from '@mui/icons-material/Terrain';
import LandscapeIcon from '@mui/icons-material/Landscape';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

interface MapLayer {
  id: string;
  label: string;
  icon: React.ReactNode;
  rules: { title: string; description: string }[];
  color: string;
}

const MAP_LAYERS: MapLayer[] = [
  {
    id: 'water',
    label: 'Water Buffers',
    icon: <WaterIcon />,
    color: '#0ea5e9',
    rules: [
      { title: 'River Setback (Sec 9.7)', description: 'Mandatory 150m buffer from unembanked river banks.' },
      { title: 'Lake/Canal (Sec 9.7)', description: 'Strict 18m offset from existing lake boundaries.' },
    ],
  },
  {
    id: 'seismic',
    label: 'Seismic Zones',
    icon: <TerrainIcon />,
    color: '#f59e0b',
    rules: [
      { title: 'Liquefaction Risk', description: 'Special structural reinforcement required in Sector 4 & 5.' },
      { title: 'Zone III Standards', description: 'Mandatory IS 1893:2016 compliance for all high-rises.' },
    ],
  },
  {
    id: 'environment',
    label: 'Green Belts',
    icon: <LandscapeIcon />,
    color: '#10b981',
    rules: [
      { title: 'CRZ Restrictions', description: 'No-build zones within 500m of the coastal baseline.' },
      { title: 'TP Forest Buffer', description: '50m preservation zone around TP-mapped green clusters.' },
    ],
  },
];

export const RiskMapping: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('water');

  const layer = MAP_LAYERS.find(l => l.id === activeLayer) || MAP_LAYERS[0];

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: 'var(--color-brand-primary)', mb: 1 }}>
          Interactive Risk & Zoning Map
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          Visual verification of Section 9 spatial exclusions and safety buffers.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              height: 400,
              bgcolor: '#e2e8f0',
              borderRadius: 'var(--radius-container)',
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            {/* Visual Representation of Map Layers (Mock SVG/Box structure) */}
            <Box
              sx={{
                width: '80%',
                height: '70%',
                border: '2px dashed #94a3b8',
                borderRadius: 2,
                position: 'relative',
                transition: 'all 0.5s ease',
              }}
            >
              <Typography variant="caption" sx={{ position: 'absolute', top: -20, left: 0, fontWeight: 700, color: 'text.disabled' }}>
                DHOLERA SIR BOUNDARY
              </Typography>

              {/* Dynamic Layer Elements */}
              {activeLayer === 'water' && (
                <Box sx={{ position: 'absolute', top: '30%', left: '10%', width: '40%', height: 40, bgcolor: layer.color, opacity: 0.4, borderRadius: 10, filter: 'blur(4px)' }} />
              )}
              {activeLayer === 'seismic' && (
                <Box sx={{ position: 'absolute', inset: '20%', border: `4px solid ${layer.color}`, opacity: 0.3, borderRadius: 4, bgcolor: layer.color }} />
              )}
              {activeLayer === 'environment' && (
                <Box sx={{ position: 'absolute', bottom: '10%', right: '10%', width: 80, height: 80, bgcolor: layer.color, opacity: 0.5, borderRadius: '50%' }} />
              )}

              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <MapIcon sx={{ fontSize: 48, color: 'text.disabled', opacity: 0.5 }} />
                <Typography variant="caption" display="block" color="text.disabled">
                  Spatial Layer: {layer.label}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
              <ToggleButtonGroup
                value={activeLayer}
                exclusive
                onChange={(_, val) => val && setActiveLayer(val)}
                size="small"
                sx={{ bgcolor: 'white', boxShadow: 'var(--shadow-resting)' }}
              >
                {MAP_LAYERS.map(l => (
                  <ToggleButton key={l.id} value={l.id} sx={{ px: 2, py: 1 }}>
                    {l.icon}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 'var(--radius-container)',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'var(--color-brand-background)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon sx={{ color: layer.color }} /> {layer.label} Analysis
            </Typography>
            
            <List sx={{ p: 0 }}>
              {layer.rules.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <ListItem sx={{ px: 0, py: 2, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      <WarningIcon sx={{ fontSize: 16, color: 'var(--color-status-warning)' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="body2" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)' }}>{rule.title}</Typography>}
                      secondary={<Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>{rule.description}</Typography>}
                    />
                  </ListItem>
                  {idx < layer.rules.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 4, p: 2, bgcolor: 'white', borderRadius: 'var(--radius-interactive)', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--color-brand-secondary)', display: 'block', mb: 0.5 }}>
                SEC 9.7 AUTOMATION PASS
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>
                All spatial configurations are auto-cross-referenced against DSIRDA environmental Exclusion zones.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
