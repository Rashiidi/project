import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const registerUser  = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser  = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const uploadAssignment = async (assignmentData, token) => {
  return await axios.post(`${API_URL}/assignments`, assignmentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserAssignments = async (token) => {
  return await axios.get(`${API_URL}/assignments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const searchAssignments = async (query, token) => {
  return await axios.get(`${API_URL}/assignments/search?query=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllAssignments = async (token) => {
  return await axios.get(`${API_URL}/assignments/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};