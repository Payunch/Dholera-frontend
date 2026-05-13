import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, Chip, Stack, IconButton, 
  CircularProgress, useTheme, Card, CardContent 
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateIcon from '@mui/icons-material/Update';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from 'recharts';
import { API_BASE_URL } from '../../utils/apiBase';
import { format } from 'date-fns';

const AdminAnalytics = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  const filters = ['Today', 'Yesterday', 'Last 7 Days', 'This Month', 'This Year'];

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const startStr = dateRange.start.toISOString().split('T')[0];
      const endStr = dateRange.end.toISOString().split('T')[0];
      const res = await fetch(`${API_BASE_URL}/analytics/detailed?start=${startStr}&end=${endStr}`, {
        credentials: 'include'
      });
      
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setData(result.analytics);
        }
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (filter === 'Today') {
      start = new Date(now.getFullYear(), now.month(), now.getDate());
    } else if (filter === 'Yesterday') {
      start = new Date(now.getFullYear(), now.month(), now.getDate() - 1);
      end = new Date(now.getFullYear(), now.month(), now.getDate() - 1, 23, 59, 59);
    } else if (filter === 'Last 7 Days') {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (filter === 'This Month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (filter === 'This Year') {
      start = new Date(now.getFullYear(), 0, 1);
    }

    setDateRange({ start, end });
  };

  if (loading && !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const StatCard = ({ title, value, trend, isPositive, icon: Icon, color }) => (
    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: 48, 
          height: 48, 
          borderRadius: '50%', 
          bgcolor: `${color}15`,
          color: color
        }}>
          <Icon />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isPositive ? <TrendingUpIcon color="success" fontSize="small" /> : <TrendingDownIcon color="error" fontSize="small" />}
          <Typography variant="body2" sx={{ fontWeight: 700, color: isPositive ? 'success.main' : 'error.main' }}>
            {trend}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{title}</Typography>
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Analytics Overview</Typography>
        <Stack direction="row" spacing={1}>
          {filters.map(f => (
            <Chip 
              key={f} 
              label={f} 
              onClick={() => handleFilterChange(f)}
              color={selectedFilter === f ? 'primary' : 'default'}
              variant={selectedFilter === f ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600 }}
            />
          ))}
          <IconButton color="primary">
            <CalendarMonthIcon />
          </IconButton>
        </Stack>
      </Box>

      {data && data.dailyMetrics.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 4 }}>
          <AssessmentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>No data for this period</Typography>
          <Typography color="text.secondary">Try selecting a different date range to see analytics.</Typography>
        </Paper>
      ) : data && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Leads" 
                value={data.totalLeads} 
                trend={`${data.leadTrend > 0 ? '+' : ''}${data.leadTrend}%`}
                isPositive={data.leadTrend >= 0}
                icon={PeopleIcon}
                color={theme.palette.primary.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Visitors" 
                value={data.totalVisitors} 
                trend="+8.2%"
                isPositive={true}
                icon={VisibilityIcon}
                color={theme.palette.info.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Updates" 
                value={data.totalUpdates} 
                trend="-2.1%"
                isPositive={false}
                icon={UpdateIcon}
                color={theme.palette.success.main}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Conversion Rate" 
                value={`${((data.totalLeads / (data.totalVisitors || 1)) * 100).toFixed(1)}%`}
                trend="+1.4%"
                isPositive={true}
                icon={AssessmentIcon}
                color={theme.palette.warning.main}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} lg={8}>
              <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Lead Generation Trend</Typography>
                  <Box sx={{ height: 350, width: '100%' }}>
                    <ResponsiveContainer>
                      <BarChart data={data.dailyMetrics}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(str) => format(new Date(str), 'MMM dd')}
                          fontSize={12}
                          tickMargin={10}
                        />
                        <YAxis fontSize={12} />
                        <Tooltip 
                          labelFormatter={(label) => format(new Date(label), 'MMMM dd, yyyy')}
                          contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="leads" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Top Performing Days</Typography>
                  <Stack spacing={2}>
                    {data.topDays.map((day, idx) => (
                      <Box key={day.date} sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
                        <Box sx={{ 
                          width: 32, height: 32, borderRadius: '50%', 
                          bgcolor: 'primary.main', color: 'white', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, mr: 2, fontSize: 14
                        }}>
                          {idx + 1}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {format(new Date(day.date), 'MMM dd, yyyy')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {day.visitors} unique visitors
                          </Typography>
                        </Box>
                        <Chip 
                          label={`${day.leads} Leads`} 
                          size="small" 
                          color="success" 
                          sx={{ fontWeight: 700, bgcolor: 'success.light', color: 'success.dark' }} 
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Comparison Trend (Leads vs Visitors vs Updates)</Typography>
                  <Box sx={{ height: 350, width: '100%' }}>
                    <ResponsiveContainer>
                      <LineChart data={data.dailyMetrics}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(str) => format(new Date(str), 'MMM dd')}
                          fontSize={12}
                          tickMargin={10}
                        />
                        <YAxis fontSize={12} />
                        <Tooltip 
                          labelFormatter={(label) => format(new Date(label), 'MMMM dd, yyyy')}
                          contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="leads" stroke={theme.palette.primary.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="visitors" stroke={theme.palette.info.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="updates" stroke={theme.palette.success.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdminAnalytics;
