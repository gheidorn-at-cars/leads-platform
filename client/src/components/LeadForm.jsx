import React, { useState, useEffect } from 'react';

const LeadForm = ({ lead = {}, onSubmit, buttonText = 'Save' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    hasTradeIn: false,
    tradeInVin: '',
    leadType: 'VINLess',
    channelType: 'Email',
    sourceType: 'DealerWebsite',
    purchaseIntentionComments: '',
    ...lead
  });

  const [errors, setErrors] = useState({});

  // If lead type is WithVIN, ensure hasTradeIn is true
  useEffect(() => {
    if (formData.leadType === 'WithVIN' && !formData.hasTradeIn) {
      setFormData(prev => ({ ...prev, hasTradeIn: true }));
    }
  }, [formData.leadType]);

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (formData.hasTradeIn && !formData.tradeInVin) {
      newErrors.tradeInVin = 'VIN is required when trade-in is selected';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.phoneNumber ? 'border-red-500' : ''
              }`}
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Lead Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Lead Details</h3>
          
          <div>
            <label htmlFor="leadType" className="block text-sm font-medium text-gray-700">
              Lead Type
            </label>
            <select
              id="leadType"
              name="leadType"
              value={formData.leadType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="WithVIN">WithVIN</option>
              <option value="VINLess">VINLess</option>
              <option value="FinanceIntent">FinanceIntent</option>
            </select>
          </div>

          <div>
            <label htmlFor="channelType" className="block text-sm font-medium text-gray-700">
              Channel Type
            </label>
            <select
              id="channelType"
              name="channelType"
              value={formData.channelType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Chat">Chat</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          <div>
            <label htmlFor="sourceType" className="block text-sm font-medium text-gray-700">
              Source Type
            </label>
            <select
              id="sourceType"
              name="sourceType"
              value={formData.sourceType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Marketplace">Marketplace</option>
              <option value="DealerWebsite">Dealer Website</option>
              <option value="InstantOffer">Instant Offer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trade-in Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Trade-in Information</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasTradeIn"
            name="hasTradeIn"
            checked={formData.hasTradeIn || formData.leadType === 'WithVIN'}
            onChange={handleChange}
            disabled={formData.leadType === 'WithVIN'}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="hasTradeIn" className="ml-2 block text-sm font-medium text-gray-700">
            Has Trade-in Vehicle
          </label>
        </div>

        {formData.hasTradeIn && (
          <div>
            <label htmlFor="tradeInVin" className="block text-sm font-medium text-gray-700">
              Trade-in VIN
            </label>
            <input
              type="text"
              id="tradeInVin"
              name="tradeInVin"
              value={formData.tradeInVin}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.tradeInVin ? 'border-red-500' : ''
              }`}
            />
            {errors.tradeInVin && (
              <p className="mt-1 text-sm text-red-500">{errors.tradeInVin}</p>
            )}
          </div>
        )}
      </div>

      {/* Purchase Intention Comments */}
      <div>
        <label htmlFor="purchaseIntentionComments" className="block text-sm font-medium text-gray-700">
          Purchase Intention Comments
        </label>
        <textarea
          id="purchaseIntentionComments"
          name="purchaseIntentionComments"
          rows="3"
          value={formData.purchaseIntentionComments || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;