
import React from 'react';
import Navigation from '@/components/Navigation';
import OrganizationList from '@/components/OrganizationList';

const Organizations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <h1 className="nexus-page-title">Organizations</h1>
        <OrganizationList />
      </main>
    </div>
  );
};

export default Organizations;
