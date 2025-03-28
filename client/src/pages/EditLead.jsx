import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import { fetchLead, updateLead } from '../services/api';

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLead = async () => {
      try {
        setLoading(true);
        const data = await fetchLead(id);
        setLead(data);
        setError(null);
      } catch (err) {
        setError('Failed to load lead details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLead();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateLead(id, formData);
      navigate(`/leads/${id}`);
    } catch (err) {
      setError('Failed to update lead. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Lead</h1>
          <p className="mt-2 text-sm text-gray-700">
            Update the information for this sales lead.
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

      {loading ? (
        <div className="mt-6 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          {lead ? (
            <LeadForm lead={lead} onSubmit={handleSubmit} buttonText="Update Lead" />
          ) : (
            <p className="text-center text-gray-500">Lead not found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditLead;