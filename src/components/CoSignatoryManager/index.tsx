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
  IconButton,
  Chip,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Tooltip,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GavelIcon from '@mui/icons-material/Gavel';

interface CoSignatory {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Partner' | 'Legal Rep';
  status: 'pending' | 'signed' | 'declined';
}

export const CoSignatoryManager: React.FC = () => {
  const [signatories, setSignatories] = useState<CoSignatory[]>([
    { id: '1', name: 'Rajesh Shah', email: 'rajesh@example.com', role: 'Owner', status: 'signed' },
    { id: '2', name: 'Amit Mehta', email: 'amit@mehtagroup.com', role: 'Partner', status: 'pending' },
  ]);

  const [open, setOpen] = useState(false);
  const [newSignatory, setNewSignatory] = useState({ name: '', email: '', role: 'Owner' });

  const handleAdd = () => {
    const id = (signatories.length + 1).toString();
    setSignatories([...signatories, { ...newSignatory, id, status: 'pending' } as CoSignatory]);
    setOpen(false);
    setNewSignatory({ name: '', email: '', role: 'Owner' });
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'signed':
        return <Chip icon={<CheckCircleIcon />} label="Signed" size="small" sx={{ bgcolor: 'emerald.50', color: 'var(--color-status-success)', fontWeight: 800 }} />;
      case 'pending':
        return <Chip icon={<AccessTimeIcon />} label="Pending" size="small" sx={{ bgcolor: 'amber.50', color: 'var(--color-status-warning)', fontWeight: 800 }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <GavelIcon sx={{ color: 'var(--color-brand-accent)' }} /> Multi-Owner Authorization Node
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Manage co-signatory digital signatures for Section 3.6 compliance.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 'var(--radius-interactive)', fontWeight: 700, borderColor: 'divider' }}
        >
          Invite Co-Owner
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 'var(--radius-container)' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: 'var(--color-brand-background)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' }}>Signatory</TableCell>
              <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' }}>Project Role</TableCell>
              <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {signatories.map((person) => (
              <TableRow key={person.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'var(--color-brand-secondary)' }}>
                      {person.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--color-brand-primary)' }}>{person.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{person.email}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>{person.role}</Typography>
                </TableCell>
                <TableCell>{getStatusChip(person.status)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    {person.status === 'pending' && (
                      <Tooltip title="Resend Invite">
                        <IconButton size="small" color="primary">
                          <SendIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <IconButton size="small" onClick={() => setSignatories(s => s.filter(x => x.id !== person.id))}>
                      <DeleteIcon fontSize="inherit" sx={{ color: 'var(--color-status-error)' }} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Invite Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 'var(--radius-container)' } }}>
        <DialogTitle sx={{ fontWeight: 900, color: 'var(--color-brand-primary)' }}>Invite Co-Signatory</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              size="small"
              value={newSignatory.name}
              onChange={(e) => setNewSignatory({ ...newSignatory, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email Address"
              size="small"
              type="email"
              value={newSignatory.email}
              onChange={(e) => setNewSignatory({ ...newSignatory, email: e.target.value })}
            />
            <TextField
              fullWidth
              select
              label="Project Role"
              size="small"
              value={newSignatory.role}
              onChange={(e) => setNewSignatory({ ...newSignatory, role: e.target.value as any })}
              SelectProps={{ native: true }}
            >
              <option value="Owner">Primary Owner</option>
              <option value="Partner">Development Partner</option>
              <option value="Legal Rep">Legal Representative</option>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 700, color: 'text.secondary' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{ bgcolor: 'var(--color-brand-primary)', fontWeight: 800, borderRadius: 'var(--radius-interactive)' }}
          >
            Send Digital Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
