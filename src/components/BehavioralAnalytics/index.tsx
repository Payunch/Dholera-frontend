import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const EVENT_DATA = [
  { name: '09:00', initiated: 12, compliance_shown: 4, document_dropped: 2 },
  { name: '10:00', initiated: 18, compliance_shown: 8, document_dropped: 5 },
  { name: '11:00', initiated: 45, compliance_shown: 14, document_dropped: 12 },
  { name: '12:00', initiated: 32, compliance_shown: 10, document_dropped: 8 },
  { name: '13:00', initiated: 28, compliance_shown: 6, document_dropped: 6 },
  { name: '14:00', initiated: 55, compliance_shown: 22, document_dropped: 18 },
  { name: '15:00', initiated: 64, compliance_shown: 28, document_dropped: 24 },
];

const COMPLIANCE_PIE = [
  { name: 'Clean Pass', value: 65, color: '#10b981' },
  { name: 'Height Warning', value: 20, color: '#f59e0b' },
  { name: 'Missing Docs', value: 15, color: '#ef4444' },
];

export const BehavioralAnalytics: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Avatar sx={{ bgcolor: 'var(--color-brand-primary)' }}>
          <PsychologyIcon />
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--color-brand-primary)' }}>
            Behavioral Capture Engine
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Real-time tracking of pre-screening engagement and compliance friction.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        {[
          { label: 'Calculator Initialized', value: '254', icon: <TrendingUpIcon />, color: 'var(--color-brand-accent)' },
          { label: 'Compliance Alerts', value: '92', icon: <WarningAmberIcon />, color: 'var(--color-status-warning)' },
          { label: 'Document Rejections', value: '14', icon: <HighlightOffIcon />, color: 'var(--color-status-error)' },
        ].map((kpi, idx) => (
          <Grid size={{ xs: 12, md: 4 }} key={idx}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 'var(--radius-container)' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>{kpi.label}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: kpi.color, mt: 0.5 }}>{kpi.value}</Typography>
                  </Box>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${kpi.color}10`, color: kpi.color }}>
                    {kpi.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Engagement Trend */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 'var(--radius-container)', height: 400 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3 }}>Hourly Engagement Pipeline</Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={EVENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-resting)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="initiated" fill="var(--color-brand-accent)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="compliance_shown" fill="var(--color-status-warning)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="document_dropped" fill="var(--color-brand-primary)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Compliance Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 'var(--radius-container)', height: 400 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3 }}>Structural Compliance Pass Rate</Typography>
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={COMPLIANCE_PIE}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COMPLIANCE_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {COMPLIANCE_PIE.map((item, idx) => (
                <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>{item.value}%</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
import { Avatar } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
