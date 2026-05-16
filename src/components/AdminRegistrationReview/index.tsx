import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface ProfessionalRecord {
  id: string;
  name: string;
  type: 'Architect' | 'Structural Engineer' | 'Developer';
  licenseNo: string;
  email: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_DATA: ProfessionalRecord[] = [
  { id: '1', name: 'Ar. Vikram Sarabhai', type: 'Architect', licenseNo: 'COA/2026/001', email: 'vikram@sarabhai.arch', appliedDate: '15 May 2026', status: 'pending' },
  { id: '2', name: 'Dr. Homi Bhabha', type: 'Structural Engineer', licenseNo: 'SER/2026/442', email: 'homi@nuclear.eng', appliedDate: '14 May 2026', status: 'pending' },
  { id: '3', name: 'Adani Infra Group', type: 'Developer', licenseNo: 'DEV/2026/900', email: 'compliance@adani.com', appliedDate: '12 May 2026', status: 'approved' },
];

export const AdminRegistrationReview: React.FC = () => {
  const [records, setRecords] = useState(INITIAL_DATA);
  const [selectedRecord, setSelectedRecord] = useState<ProfessionalRecord | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setRecords(records.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setReviewOpen(false);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return <Chip icon={<VerifiedIcon />} label="Approved" size="small" color="success" sx={{ fontWeight: 800 }} />;
      case 'pending':
        return <Chip icon={<PendingActionsIcon />} label="Pending Review" size="small" color="warning" sx={{ fontWeight: 800 }} />;
      case 'rejected':
        return <Chip icon={<HighlightOffIcon />} label="Rejected" size="small" color="error" sx={{ fontWeight: 800 }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--color-brand-primary)', mb: 3 }}>
        Professional Registration Queue (DSIRDA Section 8.1)
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 'var(--radius-container)' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: 'var(--color-brand-background)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Professional Name</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>License No.</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Applied Date</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{row.name}</TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{row.type}</Typography>
                </TableCell>
                <TableCell sx={{ fontFamily: 'var(--font-interface-mono)', fontSize: '0.75rem' }}>{row.licenseNo}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{row.appliedDate}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={() => { setSelectedRecord(row); setReviewOpen(true); }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {row.status === 'pending' && (
                      <>
                        <Tooltip title="Approve Registration">
                          <IconButton size="small" color="success" onClick={() => handleStatusChange(row.id, 'approved')}>
                            <CheckCircleOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject Application">
                          <IconButton size="small" color="error" onClick={() => handleStatusChange(row.id, 'rejected')}>
                            <HighlightOffIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Review Dialog */}
      <Dialog open={reviewOpen} onClose={() => setReviewOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 'var(--radius-container)' } }}>
        {selectedRecord && (
          <>
            <DialogTitle sx={{ fontWeight: 900 }}>Review Professional Credentials</DialogTitle>
            <DialogContent>
              <Alert severity={selectedRecord.status === 'pending' ? 'info' : selectedRecord.status === 'approved' ? 'success' : 'error'} sx={{ mb: 3 }}>
                Current Status: {selectedRecord.status.toUpperCase()}
              </Alert>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>LEGAL ENTITY NAME</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>{selectedRecord.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>REGISTRATION TYPE</Typography>
                  <Typography variant="body1">{selectedRecord.type}</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>COA/ENG LICENSE NO.</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedRecord.licenseNo}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>CONTACT EMAIL</Typography>
                    <Typography variant="body2">{selectedRecord.email}</Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Verification Checklist:
                  • License validity cross-referenced with national database.
                  • Section 8.1 minimum experience criteria met.
                  • Liability insurance certificate attached.
                </Typography>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setReviewOpen(false)}>Close</Button>
              {selectedRecord.status === 'pending' && (
                <>
                  <Button variant="outlined" color="error" onClick={() => handleStatusChange(selectedRecord.id, 'rejected')}>Reject</Button>
                  <Button variant="contained" color="success" onClick={() => handleStatusChange(selectedRecord.id, 'approved')}>Approve</Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};
