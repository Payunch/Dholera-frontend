import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface FileUpload {
  id: string;
  name: string;
  size: string;
  status: 'idle' | 'uploading' | 'completed' | 'error';
  progress: number;
}

const REQUIRED_DOCS = [
  { id: 'form-c', label: 'Form C / C-A (Plan Sets)', description: 'Full architectural plan sets with Section 2.4 color coding.' },
  { id: 'structural-cert', label: 'Structural Engineer Certificate', description: 'Certified document from a licensed structural designer (Sec 2.3).' },
  { id: 'ownership-proof', label: 'Ownership / Lease Documents', description: 'Verified land ownership proof or long-term lease agreement.' },
];

interface DocumentDropZoneProps {
  hideHeader?: boolean;
}

export const DocumentDropZone: React.FC<DocumentDropZoneProps> = ({ hideHeader = false }) => {
  const [uploads, setUploads] = useState<Record<string, FileUpload | null>>({
    'form-c': null,
    'structural-cert': null,
    'ownership-proof': null,
  });

  const handleFileDrop = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload process
    const newUpload: FileUpload = {
      id: docId,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'uploading',
      progress: 0,
    };

    setUploads(prev => ({ ...prev, [docId]: newUpload }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploads(prev => ({
          ...prev,
          [docId]: { ...prev[docId]!, status: 'completed', progress: 100 },
        }));
      } else {
        setUploads(prev => ({
          ...prev,
          [docId]: { ...prev[docId]!, progress },
        }));
      }
    }, 400);
  };

  const handleDelete = (docId: string) => {
    setUploads(prev => ({ ...prev, [docId]: null }));
  };

  return (
    <Box sx={{ py: hideHeader ? 0 : 4 }}>
      {!hideHeader && (
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)', mb: 3, fontFamily: 'var(--font-interface-headings)' }}>
          Mandatory Structural Document Uploads
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {REQUIRED_DOCS.map((doc) => {
          const upload = uploads[doc.id];
          return (
            <Grid size={{ xs: 12, md: 4 }} key={doc.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: upload?.status === 'completed' ? 'var(--color-status-success)' : 'divider',
                  borderRadius: 'var(--radius-container)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 'var(--shadow-hover)',
                    borderColor: 'var(--color-brand-accent)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--color-brand-primary)', mb: 0.5 }}>
                    {doc.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: 'block' }}>
                    {doc.description}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                  {!upload ? (
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      sx={{
                        py: 3,
                        borderStyle: 'dashed',
                        borderRadius: 'var(--radius-interactive)',
                        color: 'text.secondary',
                        borderColor: 'divider',
                        '&:hover': { borderStyle: 'dashed', bgcolor: 'var(--color-brand-background)' },
                      }}
                    >
                      Choose File
                      <input type="file" hidden onChange={(e) => handleFileDrop(doc.id, e)} />
                    </Button>
                  ) : (
                    <Box sx={{ width: '100%', p: 2, bgcolor: 'var(--color-brand-background)', borderRadius: 'var(--radius-interactive)', border: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <InsertDriveFileIcon color="primary" fontSize="small" />
                        <Typography variant="body2" sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }}>
                          {upload.name}
                        </Typography>
                        <IconButton size="small" onClick={() => handleDelete(doc.id)}>
                          <DeleteIcon fontSize="small" sx={{ color: 'var(--color-status-error)' }} />
                        </IconButton>
                      </Stack>
                      
                      {upload.status === 'uploading' && (
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <LinearProgress variant="determinate" value={upload.progress} sx={{ height: 4, borderRadius: 2 }} />
                        </Box>
                      )}

                      {upload.status === 'completed' && (
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Verified"
                          size="small"
                          sx={{ bgcolor: 'emerald.50', color: 'var(--color-status-success)', fontWeight: 800, mt: 1 }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ mt: 'auto' }}>
                   {upload?.status === 'completed' ? (
                     <Typography variant="caption" sx={{ color: 'var(--color-status-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                       <CheckCircleIcon sx={{ fontSize: 14 }} /> Ready for Section 2.7 review
                     </Typography>
                   ) : (
                     <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                       * Maximum file size 25MB
                     </Typography>
                   )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
