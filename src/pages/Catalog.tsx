
import React from 'react';
import Navigation from '@/components/Navigation';
import ProductList from '@/components/ProductList';

const Catalog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <h1 className="nexus-page-title">Product Catalog</h1>
        <ProductList />
      </main>
    </div>
  );
};

export default Catalog;
