import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import axios from 'axios';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, assignmentsRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/assignments')
        ]);
        setUsers(usersRes.data);
        setAssignments(assignmentsRes.data);
      } catch (err) {
        console.error('Admin data fetch failed:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users ({users.length})
              </Typography>
              {users.map((user) => (
                <Box key={user.id} sx={{ 
                  mb: 1, p: 2, 
                  border: '1px solid #eee',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    {user.email}
                    <Chip 
                      label={user.role} 
                      size="small" 
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      sx={{ ml: 1 }}
                    />
                  </div>
                  <div>
                    {user.assignmentsCount} assignments
                  </div>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                All Assignments ({assignments.length})
              </Typography>
              {assignments.map((assignment) => (
                <Box key={assignment.id} sx={{ 
                  mb: 1, p: 2,
                  border: '1px solid #eee',
                  borderRadius: 1
                }}>
                  <div>
                    <strong>{assignment.filename}</strong>
                    <Typography variant="body2">
                      Uploaded by: {assignment.User?.email}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(assignment.createdAt).toLocaleDateString()}
                    </Typography>
                  </div>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}