import React from 'react';
import { Box, Typography, Grid, Paper, Tooltip, Zoom } from '@mui/material';

interface ColorToken {
  label: string;
  description: string;
  variable: string;
  pattern?: 'solid' | 'dashed' | 'dotted' | 'striped';
}

const colorTokens: ColorToken[] = [
  { label: 'Core Property Lot', description: 'Solid outlines for primary plot boundaries.', variable: '--color-zoning-boundary' },
  { label: 'Existing Roads', description: 'Active ground transit and forest green channels.', variable: '--color-zoning-road-existing' },
  { label: 'Proposed Additions', description: 'Crimson red highlights for new structural assets.', variable: '--color-zoning-proposed-work' },
  { label: 'Target Demolition', description: 'Hazard yellow 45° stripe mesh for removals.', variable: '--color-zoning-demolition', pattern: 'striped' },
  { label: 'Historic Preserved', description: 'Indigo blue tints for protected heritage assets.', variable: '--color-zoning-historic' },
  { label: 'Main Water Supply', description: 'Solid dark black paths for supply routing.', variable: '--color-zoning-water-supply' },
  { label: 'Wastewater Drainage', description: 'Dotted crimson paths for outflow management.', variable: '--color-zoning-drainage', pattern: 'dotted' },
];

export const PlanColorKey: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 'var(--radius-container)',
        boxShadow: 'var(--shadow-resting)',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: 'var(--color-brand-primary)',
            fontFamily: 'var(--font-interface-headings)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'var(--color-brand-accent)',
              borderRadius: '50%',
            }}
          />
          Section 2.4 Visual Plan Color-Code Key
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          Official DSIRDA blueprint swatches for automated plan verification.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {colorTokens.map((token, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
            <Tooltip
              title={token.description}
              placement="top"
              arrow
              TransitionComponent={Zoom}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 'var(--radius-interactive)',
                  border: '1px solid',
                  borderColor: 'grey.50',
                  transition: 'all 0.2s ease',
                  cursor: 'help',
                  '&:hover': {
                    bgcolor: 'grey.50',
                    borderColor: 'divider',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '4px',
                    flexShrink: 0,
                    bgcolor: `var(${token.variable})`,
                    border: '1px solid rgba(0,0,0,0.1)',
                    ...(token.pattern === 'striped' && {
                      backgroundImage: `linear-gradient(45deg, var(${token.variable}) 25%, transparent 25%, transparent 50%, var(${token.variable}) 50%, var(${token.variable}) 75%, transparent 75%, transparent)`,
                      backgroundSize: '8px 8px',
                    }),
                    ...(token.pattern === 'dotted' && {
                      borderStyle: 'dotted',
                      borderWidth: '3px',
                      bgcolor: 'transparent',
                      borderColor: `var(${token.variable})`,
                    }),
                  }}
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-brand-primary)' }}>
                    {token.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>
                    Section 2.4 Specs
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
