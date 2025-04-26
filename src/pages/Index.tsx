
import React from 'react';
import Navigation from '@/components/Navigation';
import DashboardStats from '@/components/DashboardStats';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Building2, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  Package,
  Layers,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const quickLinks = [
    { title: 'Product Catalog', icon: <Package />, description: 'Browse and manage products and categories', link: '/catalog' },
    { title: 'Orders', icon: <ShoppingCart />, description: 'View and process customer orders', link: '/orders' },
    { title: 'Organizations', icon: <Building2 />, description: 'Manage B2B customers and accounts', link: '/organizations' },
    { title: 'Quotes', icon: <FileText />, description: 'Handle quote requests and approvals', link: '/quotes' },
    { title: 'Reports', icon: <BarChart3 />, description: 'Access sales and performance metrics', link: '/reports' },
    { title: 'Settings', icon: <Settings />, description: 'Configure platform preferences', link: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">B2B Commerce Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome to your B2B commerce management platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </div>
        </div>
        
        {/* Statistics section */}
        <section className="mb-10">
          <DashboardStats />
        </section>
        
        {/* Quick access section */}
        <section className="mb-10">
          <h2 className="nexus-section-title mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link to={link.link} key={index}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-nexus-500 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-nexus-50 rounded-full mr-3">
                      <div className="text-nexus-600">{link.icon}</div>
                    </div>
                    <h3 className="text-lg font-medium">{link.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Platform information */}
        <section className="bg-gradient-to-r from-nexus-700 to-nexus-800 rounded-lg text-white p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <Layers className="h-full w-full" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">B2B Commerce Nexus Platform</h2>
            <p className="mb-6">
              A comprehensive, modular, and scalable open-source B2B e-commerce solution designed for complex business scenarios.
              Featuring robust backend logic, a flexible frontend, and modern deployment strategies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">View Documentation</Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                Explore API
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
