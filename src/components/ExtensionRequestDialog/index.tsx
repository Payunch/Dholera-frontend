import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

interface Props {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export const ExtensionRequestDialog: React.FC<Props> = ({ open, onClose, projectId }) => {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    onClose();
    alert('Extension request for ' + projectId + ' submitted. Please complete the ₹300.00 payment.');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 'var(--radius-container)' } }}>
      <DialogTitle sx={{ fontWeight: 900, color: 'var(--color-brand-primary)', pb: 1 }}>
        Request Clearance Extension
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Alert severity="info" icon={<InfoOutlinedIcon />} sx={{ borderRadius: 'var(--radius-interactive)' }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Under DSIRDA regulations, development permissions expire if construction does not commence within 1 year. You are eligible for a 3-year extension.
            </Typography>
          </Alert>

          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 'var(--radius-interactive)' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Project Details</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>Reference ID: {projectId}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>Current Validity: Expiring in 24 days</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ReceiptLongIcon fontSize="small" color="primary" /> Renewal Fee Matrix
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ py: 1, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Typography variant="body2" color="text.secondary">Standard Extension Fee (3 Years)</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>₹300.00</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>Total Payable</Typography>
              <Typography variant="body2" sx={{ fontWeight: 900, color: 'var(--color-brand-accent)' }}>₹300.00</Typography>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ fontWeight: 700, color: 'text.secondary' }}>Close</Button>
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={loading}
          startIcon={<HistoryIcon />}
          sx={{ bgcolor: 'var(--color-brand-primary)', fontWeight: 800, borderRadius: 'var(--radius-interactive)', px: 4 }}
        >
          {loading ? 'Processing...' : 'Apply for Extension'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
