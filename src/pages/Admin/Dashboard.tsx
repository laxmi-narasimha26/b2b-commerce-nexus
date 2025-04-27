
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart, LineChart, PieChart, Settings, Package, Users, ShoppingCart, Bell, Plus, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Dashboard | Benz Packaging Solutions</title>
      </Helmet>
      
      <Navigation />
      
      <div className="nexus-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your products, orders, and customers</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings" className="hidden md:block">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">₹</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12</div>
                  <p className="text-xs text-muted-foreground">
                    -4% from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+249</div>
                  <p className="text-xs text-muted-foreground">
                    +30% new registrations
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Revenue Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] md:h-[300px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                  <div className="text-center p-4">
                    <LineChart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">Revenue chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Orders and Popular Products */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest 5 orders placed on your store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div>
                          <p className="font-medium">Order #{23789 + i}</p>
                          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-right">₹{(Math.random() * 10000).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">5 items</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin/orders">View All Orders</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Popular Products</CardTitle>
                  <CardDescription>Top selling products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded mr-2"></div>
                          <p className="font-medium">Product {i + 1}</p>
                        </div>
                        <p className="font-medium">{50 - i * 10} sold</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin/products">View All Products</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your products and inventory</CardDescription>
                </div>
                <Button asChild>
                  <Link to="/admin/products/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                  <div className="text-center p-4">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">Product list will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current stock levels by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                    <div className="text-center p-4">
                      <PieChart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500">Inventory chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Best and worst performing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                    <div className="text-center p-4">
                      <BarChart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500">Performance chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </div>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                  <div className="text-center p-4">
                    <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">Order list will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>Manage your customers and organizations</CardDescription>
                </div>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View Organizations
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                  <div className="text-center p-4">
                    <Users className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">Customer list will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure your store settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-200">
                  <div className="text-center p-4">
                    <Settings className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">Settings will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
