
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, FileText, BarChart3, Users, Bell, Building2, ShoppingCart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/context/AuthContext';

const BusinessDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Business Dashboard | Benz Packaging Solutions</title>
      </Helmet>
      
      <Navigation />
      
      <div className="nexus-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Business Dashboard</h1>
            <p className="text-gray-500">Manage your orders, products, and account settings</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 lg:w-[450px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Catalog</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Welcome card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Welcome back, {user?.firstName}!</CardTitle>
                <CardDescription>
                  This is your business dashboard where you can manage all aspects of your B2B relationship with Benz Packaging Solutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your business account gives you access to bulk pricing, custom quotes, and priority support.
                </p>
              </CardContent>
            </Card>
            
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    2 awaiting shipment
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">₹</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹24,565</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products Purchased</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">
                    Across 12 categories
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">
                    All tickets resolved within 24h
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your most recent orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">Order #{12345 + i}</p>
                        <p className="text-sm text-gray-500">{new Date(Date.now() - i * 86400000 * 3).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-right">₹{(Math.random() * 5000 + 2000).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{i === 0 ? 'Processing' : i === 1 ? 'Shipped' : 'Delivered'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/orders">View All Orders</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">Order #{12345 + i}</h3>
                          <p className="text-sm text-gray-500">{new Date(Date.now() - i * 86400000 * 3).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(Math.random() * 5000 + 2000).toFixed(2)}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            i === 0 ? 'bg-blue-100 text-blue-800' : 
                            i === 1 ? 'bg-amber-100 text-amber-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {i === 0 ? 'Processing' : i === 1 ? 'Shipped' : 'Delivered'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-700">Items: {3 + i} products</p>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/orders/${12345 + i}`}>View Details</Link>
                          </Button>
                          {i === 0 && (
                            <Button size="sm" variant="secondary">Track Order</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>Browse available products and recent purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border overflow-hidden shadow-sm">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Packaging Product {i + 1}</h3>
                        <p className="text-sm text-gray-500 mt-1">Premium quality packaging solution</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-medium">₹{(Math.random() * 1000 + 200).toFixed(2)}</span>
                          <Button size="sm" asChild>
                            <Link to={`/catalog/product-${i + 1}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/catalog">Browse Full Catalog</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
