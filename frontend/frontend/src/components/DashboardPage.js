import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('/api/assignments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>{assignment.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
