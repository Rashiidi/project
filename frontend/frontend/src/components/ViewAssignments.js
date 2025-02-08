import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/assignments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments", error);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(assignments.filter((assignment) => assignment._id !== id));
    } catch (error) {
      console.error("Error deleting assignment", error);
    }
  };

  return (
    <div>
      <h2>Your Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            <a href={`/${assignment.filePath}`} target="_blank" rel="noreferrer">
              {assignment.title}
            </a>
            <button onClick={() => handleDelete(assignment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
