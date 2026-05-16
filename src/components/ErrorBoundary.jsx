import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          bgcolor: '#f8fafc',
          p: 3
        }}>
          <Paper elevation={3} sx={{ p: 5, maxWidth: 500, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#ef4444', mb: 2 }}>
              Application Error
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
              The application encountered an unexpected runtime failure. Please try refreshing the page.
            </Typography>
            <Box sx={{ mb: 4, p: 2, bgcolor: '#fee2e2', borderRadius: 2, textAlign: 'left', overflow: 'auto', maxHeight: 200 }}>
              <Typography variant="caption" component="pre" sx={{ color: '#b91c1c', fontWeight: 600 }}>
                {this.state.error?.toString()}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ bgcolor: '#0f172a', px: 4, py: 1.5, fontWeight: 700 }}
            >
              Reload Platform
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
