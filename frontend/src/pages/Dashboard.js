import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  IconButton,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Logout, UploadFile } from '@mui/icons-material';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('/api/assignments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add auth header
          }
        });
        setAssignments(res.data);
      } catch (err) {
        setError('Failed to fetch assignments. Please try again.');
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleUploadSuccess = (newAssignment) => {
    setAssignments([newAssignment, ...assignments]); // Add to top of list
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await axios.delete(`/api/assignments/${id}`);
      setAssignments(assignments.filter(a => a.id !== id));
    } catch (err) {
      setError('Failed to delete assignment.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Welcome, {user?.email}
          {user?.role === 'admin' && (
            <Typography component="span" color="primary" sx={{ ml: 1 }}>
              (Admin)
            </Typography>
          )}
        </Typography>
        <IconButton onClick={logout} color="error" aria-label="logout">
          <Logout />
        </IconButton>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Upload Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload New Assignment
              </Typography>
              <FileUpload onUpload={handleUploadSuccess} />
            </CardContent>
          </Card>
        </Grid>

        {/* Assignments List */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Your Assignments
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : assignments.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No assignments found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {assignments.map((assignment) => (
                <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {assignment.filename}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Uploaded: {new Date(assignment.createdAt).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button 
                          variant="outlined" 
                          href={assignment.path} 
                          target="_blank"
                          startIcon={<UploadFile />}
                        >
                          View File
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteAssignment(assignment.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}