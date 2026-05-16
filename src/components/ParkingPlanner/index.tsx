import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Divider,
  Stack,
  Slider,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { API_BASE_URL } from '../../utils/apiBase';

interface ParkingState {
  builtUpArea: number;
  tenements: number;
  propertyType: 'residential' | 'commercial' | 'industrial';
}

export const ParkingPlanner: React.FC = () => {
  const [params, setParams] = useState<ParkingState>({
    builtUpArea: 1000,
    tenements: 10,
    propertyType: 'residential',
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const calculations = useMemo(() => {
    // Logic based on GDCR Section 9.5
    let ecsBase = 0;
    if (params.propertyType === 'residential') {
      ecsBase = Math.ceil(params.tenements * 1.2); // 1.2 ECS per tenement for mid-high rise
    } else if (params.propertyType === 'commercial') {
      ecsBase = Math.ceil(params.builtUpArea / 50); // 1 ECS per 50 sq.m
    } else {
      ecsBase = Math.ceil(params.builtUpArea / 100); // 1 ECS per 100 sq.m
    }

    const totalArea = ecsBase * 25; // 25 sq.m per ECS for 4-wheelers
    const twoWheelerCount = Math.ceil(ecsBase * 0.25); // 25% for 2-wheelers
    const cycleCount = Math.ceil(ecsBase * 0.05); // 5% for bicycles

    return { ecsBase, totalArea, twoWheelerCount, cycleCount };
  }, [params]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clearance/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: 'New Parking Calculation',
          modelType: 'parking-planner',
          configurationData: params,
          LeadId: null,
          status: 'Draft'
        })
      });
      if (response.ok) {
        setSaveSuccess(true);
      } else {
        console.error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 'var(--radius-container)',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', gap: 1 }}>
          <DirectionsCarIcon sx={{ color: 'var(--color-brand-accent)' }} /> Section 9.5 Parking Spatial Planner
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          Automated Equivalent Car Space (ECS) allocation matrix for multi-use zones.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                Property Usage Intensity
              </Typography>
              <Slider
                value={params.builtUpArea}
                min={100}
                max={50000}
                step={100}
                onChange={(_, v) => setParams({ ...params, builtUpArea: v as number })}
                sx={{ color: 'var(--color-brand-accent)' }}
              />
              <TextField
                fullWidth
                size="small"
                label="Total Built-Up Area (sq.m)"
                type="number"
                value={params.builtUpArea}
                onChange={(e) => setParams({ ...params, builtUpArea: parseInt(e.target.value) || 0 })}
                sx={{ mt: 1 }}
              />
            </Box>

            {params.propertyType === 'residential' && (
              <TextField
                fullWidth
                size="small"
                label="Number of Tenements/Units"
                type="number"
                value={params.tenements}
                onChange={(e) => setParams({ ...params, tenements: parseInt(e.target.value) || 0 })}
              />
            )}

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                Configuration Selection
              </Typography>
              <Stack direction="row" spacing={1}>
                {['residential', 'commercial', 'industrial'].map((type) => (
                  <Paper
                    key={type}
                    elevation={0}
                    onClick={() => setParams({ ...params, propertyType: type as any })}
                    sx={{
                      flex: 1,
                      p: 1.5,
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: params.propertyType === type ? 'var(--color-brand-accent)' : 'divider',
                      bgcolor: params.propertyType === type ? 'var(--color-brand-background)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': { borderColor: 'var(--color-brand-accent)' }
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'capitalize' }}>{type}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: 'var(--color-brand-background)', borderRadius: 'var(--radius-interactive)', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3, color: 'var(--color-brand-primary)' }}>
              Allocated Inventory Requirements
            </Typography>
            
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', color: 'primary.main' }}>
                    <DirectionsCarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>4-Wheeler (ECS)</Typography>
                    <Typography variant="caption" color="text.secondary">Min 25 sq.m per lot</Typography>
                  </Box>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{calculations.ecsBase}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', color: 'success.main' }}>
                    <TwoWheelerIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>2-Wheeler (25%)</Typography>
                    <Typography variant="caption" color="text.secondary">Mandatory allocation</Typography>
                  </Box>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{calculations.twoWheelerCount}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', color: 'info.main' }}>
                    <DirectionsBikeIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>Bicycles (5%)</Typography>
                    <Typography variant="caption" color="text.secondary">Green mobility quota</Typography>
                  </Box>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{calculations.cycleCount}</Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>Total Parking Area Req.</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'var(--color-brand-accent)' }}>
                  {calculations.totalArea.toLocaleString()} sq.m
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mt: 3, p: 1.5, bgcolor: 'white', borderRadius: 1.5, border: '1px solid', borderColor: 'divider', display: 'flex', gap: 1.5 }}>
              <InfoOutlinedIcon fontSize="small" color="primary" />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Includes 25% reserve for two-wheelers and 5% for non-motorized transport as per Sec 9.5.3.
              </Typography>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{ borderRadius: 'var(--radius-interactive)', fontWeight: 800, bgcolor: 'var(--color-brand-primary)' }}
              >
                {saving ? 'Saving...' : 'Save Calculation to Profile'}
              </Button>
            </Box>

          </Box>
        </Grid>
      </Grid>

      <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={() => setSaveSuccess(false)}>
        <Alert onClose={() => setSaveSuccess(false)} severity="success" sx={{ width: '100%', fontWeight: 700 }}>
          Parking calculation saved successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};
import { Avatar } from '@mui/material';
