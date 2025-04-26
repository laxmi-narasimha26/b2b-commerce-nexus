
import React from 'react';
import Navigation from '@/components/Navigation';
import OrderList from '@/components/OrderList';

const Orders: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <h1 className="nexus-page-title">Benz Packaging - Orders</h1>
        <p className="text-gray-600 mb-6">Track and manage your orders with Benz Packaging Solutions</p>
        <OrderList />
      </main>
    </div>
  );
};

export default Orders;
