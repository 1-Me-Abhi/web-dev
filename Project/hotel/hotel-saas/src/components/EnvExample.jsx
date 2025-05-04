import React from 'react';
import env from '../config/env';

/**
 * Example component showing how to use environment variables
 */
const EnvExample = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Environment Configuration</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg">App Details</h3>
        <p>Hotel Name: {env.hotelName}</p>
        <p>Support Email: {env.supportEmail}</p>
        <p>Base URL: {env.baseUrl}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Environment</h3>
        <p>Production: {env.isProduction ? 'Yes' : 'No'}</p>
        <p>Development: {env.isDevelopment ? 'Yes' : 'No'}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Feature Flags</h3>
        <p>Booking Enabled: {env.features.enableBooking ? 'Yes' : 'No'}</p>
        <p>User Reviews Enabled: {env.features.enableUserReviews ? 'Yes' : 'No'}</p>
      </div>
      
      {/* Note: We typically don't display Firebase config in the UI */}
      {!env.isProduction && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Firebase (Dev Only)</h3>
          <p>Project ID: {env.firebase.projectId || 'Not configured'}</p>
          <p>API Key Set: {env.firebase.apiKey ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default EnvExample; 