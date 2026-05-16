import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
  Alert,
  AlertTitle,
  Grid,
  FormControl,
  FormLabel,
  Button,
  Snackbar,
  CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { API_BASE_URL } from '../../utils/apiBase';

interface ProjectState {
  zoneTier: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  builtUpArea: number;
  requestFsiUpgrade: boolean;
  structureHeight: number;
}

interface CalculationMatrix {
  baseFee: number;
  infraCharge: number;
  totalValidationFee: number;
  safetyFlags: string[];
}

/**
 * Computes base verification processing fees in strict accordance with DSIRDA Section 2.2 rules.
 */
export const calculateBaseFee = (zoneTier: string, area: number): number => {
  if (area <= 0) return 0;
  
  switch (zoneTier) {
    case 'residential':
      // Section 2.2.1: Low-Rise Residential flat rate of ₹3.00 per sq.m, minimum baseline threshold of ₹300.00
      return Math.max(300.00, area * 3.00);
    case 'commercial':
      // Section 2.2.2: Commercial / High-Rise / Mixed-Use flat rate of ₹5.00 per sq.m, minimum threshold of ₹300.00
      return Math.max(300.00, area * 5.00);
    case 'industrial':
    case 'agricultural':
      // Section 2.2.7: Specialized open workspace/mining asset calculations scaled to fractional hectares
      return Math.max(300.00, (area * 1.50) * 0.50);
    default:
      return 300.00;
  }
};

/**
 * Processes active architectural constraints and safety thresholds outlined inside Section 9 rules.
 */
export const checkZoningRestrictions = (zoneTier: string, height: number): string[] => {
  const safetyWarnings: string[] = [];
  
  if (height <= 0) return safetyWarnings;

  if (height > 16.50 && zoneTier === 'residential') {
    safetyWarnings.push("Structural heights crossing Low-Rise thresholds (16.5m) invoke Section 2.2.2 commercial baseline fee computations.");
  }
  if (height >= 21.00) {
    safetyWarnings.push("Section 9.11.1 directives strictly require dual structural lift installations for properties crossing a 21m vertical profile.");
  }
  if (height > 25.00) {
    safetyWarnings.push("Section 9.11.2 regulations mandate integrating dedicated backup diesel generation units for assets crossing 25m limits.");
  }
  
  return safetyWarnings;
};

interface FeeCalculatorProps {
  hideHeader?: boolean;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ hideHeader = false }) => {
  const [project, setProject] = useState<ProjectState>({
    zoneTier: 'residential',
    builtUpArea: 0,
    requestFsiUpgrade: false,
    structureHeight: 0,
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate fees reactively only when dependent state variables are updated
  const matrix = useMemo<CalculationMatrix>(() => {
    const baseFee = calculateBaseFee(project.zoneTier, project.builtUpArea);
    
    // Section 9.1.1: Standard Infrastructure Expansion upgrade charge calculated at ₹1500.00 per sq.m for extra 25% FSI
    const infraCharge = project.requestFsiUpgrade ? (project.builtUpArea * 1500.00) : 0;
    const totalValidationFee = baseFee + infraCharge;
    const safetyFlags = checkZoningRestrictions(project.zoneTier, project.structureHeight);

    return { baseFee, infraCharge, totalValidationFee, safetyFlags };
  }, [project]);

  const handleInputChange = (field: keyof ProjectState, value: any) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clearance/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: 'New Fee Calculation',
          modelType: 'fee-calculator',
          configurationData: project,
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
        p: { xs: 3, md: 4 },
        bgcolor: 'var(--color-brand-background)',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 'var(--radius-container)',
        boxShadow: 'var(--shadow-resting)',
        '&:hover': {
          boxShadow: 'var(--shadow-hover)',
        },
        transition: 'all 0.3s ease',
        maxWidth: 900,
        mx: 'auto',
        my: 4,
        fontFamily: 'var(--font-interface-body)',
      }}
    >
      {!hideHeader && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: 'var(--color-brand-primary)',
              fontFamily: 'var(--font-interface-headings)',
              letterSpacing: '-0.02em',
            }}
          >
            DSIRDA Clearance Verification Cost Matrix
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5, fontWeight: 500 }}>
            Automated evaluation engine derived directly from Draft GDCR regulatory parameters.
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {/* User Parameter Input Panel Area */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 1,
                  color: 'text.secondary',
                }}
              >
                Target Development Sector
              </FormLabel>
              <Select
                value={project.zoneTier}
                onChange={(e) => handleInputChange('zoneTier', e.target.value)}
                size="small"
                sx={{
                  borderRadius: 'var(--radius-interactive)',
                  bgcolor: 'background.paper',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                <MenuItem value="residential">Low-Rise Residential (Section 2.2.1)</MenuItem>
                <MenuItem value="commercial">Commercial / Mixed-Use / High-Rise (Section 2.2.2)</MenuItem>
                <MenuItem value="industrial">Industrial Site Portfolios (Section 2.2.4)</MenuItem>
                <MenuItem value="agricultural">Agriculture / Open Mining Extraction (Section 2.2.7)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 1,
                  color: 'text.secondary',
                }}
              >
                Total Proposed Built-Up Area (sq.m)
              </FormLabel>
              <TextField
                type="number"
                value={project.builtUpArea || ''}
                onChange={(e) => handleInputChange('builtUpArea', Math.max(0, parseFloat(e.target.value) || 0))}
                size="small"
                placeholder="e.g. 1250"
                fullWidth
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: 'var(--radius-interactive)',
                      bgcolor: 'background.paper',
                      fontFamily: 'var(--font-interface-mono)',
                      fontSize: '0.9rem',
                    },
                  }
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 1,
                  color: 'text.secondary',
                }}
              >
                Maximum Structural Height (meters)
              </FormLabel>
              <TextField
                type="number"
                value={project.structureHeight || ''}
                onChange={(e) => handleInputChange('structureHeight', Math.max(0, parseFloat(e.target.value) || 0))}
                size="small"
                placeholder="e.g. 22.5"
                fullWidth
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: 'var(--radius-interactive)',
                      bgcolor: 'background.paper',
                      fontFamily: 'var(--font-interface-mono)',
                      fontSize: '0.9rem',
                    },
                  }
                }}
              />
            </FormControl>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={project.requestFsiUpgrade}
                    onChange={(e) => handleInputChange('requestFsiUpgrade', e.target.checked)}
                    sx={{ 
                      color: 'var(--color-brand-accent)',
                      '&.Mui-checked': { color: 'var(--color-brand-accent)' }
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Request Premium 25% FSI Allocation Upgrade
                  </Typography>
                }
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', ml: 4, fontWeight: 500 }}>
                Invokes the infrastructure modification premium of ₹1,500.00/sq.m under Section 9.1.1 rules.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Real-Time Calculation Matrix Output Board */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 'var(--radius-interactive)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid',
                  borderColor: 'grey.100',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cost Metric Breakdown
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Subtotal
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Base Verification Fee:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'var(--font-interface-mono)', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                  ₹{matrix.baseFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  FSI Expansion Charge:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'var(--font-interface-mono)', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                  ₹{matrix.infraCharge.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>

              <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', pt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)', fontSize: '0.95rem' }}>
                  Total Processing Fees:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    fontFamily: 'var(--font-interface-mono)',
                    color: 'var(--color-brand-accent)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  ₹{matrix.totalValidationFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            </Box>

            {/* Dynamic Structural Validation Banner Area */}
            <Box sx={{ mt: 3 }}>
              {matrix.safetyFlags.length > 0 ? (
                <Alert
                  severity="warning"
                  icon={false}
                  sx={{
                    borderRadius: 'var(--radius-interactive)',
                    bgcolor: '#fff9eb',
                    borderLeft: '4px solid',
                    borderColor: 'var(--color-status-warning)',
                    '& .MuiAlert-message': { width: '100%' }
                  }}
                >
                  <AlertTitle sx={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: '#92400e', mb: 1, letterSpacing: '0.05em' }}>
                    Zoning Compliance Constraints
                  </AlertTitle>
                  <Box component="ul" sx={{ pl: 2, m: 0, fontSize: '0.75rem', color: '#b45309', fontWeight: 600, lineHeight: 1.6 }}>
                    {matrix.safetyFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </Box>
                </Alert>
              ) : (
                project.builtUpArea > 0 && (
                  <Box
                    sx={{
                      borderRadius: 'var(--radius-interactive)',
                      bgcolor: '#f0fdf4',
                      borderLeft: '4px solid',
                      borderColor: 'var(--color-status-success)',
                      color: '#166534',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box component="span" sx={{ mr: 1, fontSize: '1rem' }}>✓</Box>
                    Spatial configurations fall within safe structural clearance thresholds.
                  </Box>
                )
              )}
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
          Clearance calculation saved successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};
