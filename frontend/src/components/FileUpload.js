import { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  LinearProgress, 
  Typography, 
  Box,
  Input,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setError('');
      setProgress(0);

      const res = await axios.post('/api/assignments', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });

      onUpload(res.data);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Box sx={{ mb: 2 }}>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          inputProps={{ accept: '.pdf,.doc,.docx' }}
          sx={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Choose File
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {file.name}
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
        fullWidth
        sx={{ mb: 2 }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>

      {uploading && (
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      )}
    </Box>
  );
}