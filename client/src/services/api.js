import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLeads = async () => {
  try {
    const response = await api.get('/leads');
    return response.data.data; // Return just the leads array
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

export const fetchLead = async (id) => {
  try {
    const response = await api.get(`/leads/${id}`);
    return response.data.data; // Access the lead data
  } catch (error) {
    console.error(`Error fetching lead with id ${id}:`, error);
    throw error;
  }
};

export const createLead = async (leadData) => {
  try {
    const response = await api.post('/leads', leadData);
    return response.data.data; // Return the created lead
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

export const updateLead = async (id, leadData) => {
  try {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data.data; // Return the updated lead
  } catch (error) {
    console.error(`Error updating lead with id ${id}:`, error);
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting lead with id ${id}:`, error);
    throw error;
  }
};

export default {
  fetchLeads,
  fetchLead,
  createLead,
  updateLead,
  deleteLead,
};