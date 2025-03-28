import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import { createLead } from '../services/api';

const CreateLead = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await createLead(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to create lead. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Lead</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a new sales lead with detailed information.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <LeadForm onSubmit={handleSubmit} buttonText="Create Lead" />
      </div>
    </div>
  );
};

export default CreateLead;