import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/assignments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAssignments(response.data);
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h2>Your Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            <a href={`/${assignment.filePath}`} target="_blank" rel="noopener noreferrer">
              View Assignment
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAssignments;