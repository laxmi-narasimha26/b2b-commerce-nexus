
import React from 'react';
import Navigation from '@/components/Navigation';
import ProductList from '@/components/ProductList';

const Catalog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <div className="mb-6">
          <h1 className="nexus-page-title">Benz Packaging Solutions</h1>
          <p className="text-gray-600 mt-2">
            Browse our comprehensive range of packaging machines and materials. 
            From bubble wrap machines to protective packaging materials, we offer 
            high-quality solutions for all your industrial packaging needs.
          </p>
        </div>
        
        <ProductList />
      </main>
    </div>
  );
};

export default Catalog;
