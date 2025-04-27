
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, FileText, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/context/AuthContext';

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Customer Dashboard | Benz Packaging Solutions</title>
      </Helmet>
      
      <Navigation />
      
      <div className="nexus-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user?.firstName}!</p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 lg:w-[450px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Welcome card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Welcome to Benz Packaging!</CardTitle>
                <CardDescription>
                  Your one-stop solution for all packaging needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From here you can track your orders, browse products, and manage your account settings.
                </p>
              </CardContent>
            </Card>
            
            {/* Quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Browse Products</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Package className="h-8 w-8 text-nexus-600 mb-2" />
                  <p className="text-xs text-muted-foreground">Explore our catalog</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/catalog">Shop Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Track Orders</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ShoppingCart className="h-8 w-8 text-nexus-600 mb-2" />
                  <p className="text-xs text-muted-foreground">View your orders</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/orders">My Orders</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Support</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <FileText className="h-8 w-8 text-nexus-600 mb-2" />
                  <p className="text-xs text-muted-foreground">Get help</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/support">Contact Us</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">My Wishlist</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Heart className="h-8 w-8 text-nexus-600 mb-2" />
                  <p className="text-xs text-muted-foreground">Saved items</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full" variant="outline">
                    View Wishlist
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your order history</CardDescription>
              </CardHeader>
              <CardContent>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b py-2 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Order #{10001 + i}</h4>
                        <p className="text-sm text-gray-500">{new Date(Date.now() - i * 86400000 * 2).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        i === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {i === 0 ? 'Processing' : 'Delivered'}
                      </span>
                    </div>
                    <p className="text-sm mt-1">Items: {2 + i} • Total: ₹{(500 + i * 250).toFixed(2)}</p>
                    <div className="mt-2">
                      <Button variant="link" size="sm" className="px-0" asChild>
                        <Link to={`/orders/${10001 + i}`}>Order details →</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/orders">View All Orders</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Featured Products */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your previous orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border rounded-md overflow-hidden">
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        <Package className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">Packaging Solution {i + 1}</h4>
                        <p className="text-sm text-gray-500 mt-1">Premium quality</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium">₹{(200 + i * 150).toFixed(2)}</span>
                          <Button size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Order #{10001 + i}</h3>
                          <p className="text-sm text-gray-500">{new Date(Date.now() - i * 86400000 * 5).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          i === 0 ? 'bg-blue-100 text-blue-800' : 
                          i === 1 ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {i === 0 ? 'Processing' : i === 1 ? 'Shipped' : 'Delivered'}
                        </span>
                      </div>
                      <p className="text-sm mt-2">Items: {2 + i} • Total: ₹{(500 + i * 250).toFixed(2)}</p>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/orders/${10001 + i}`}>Order Details</Link>
                        </Button>
                        {i <= 1 && (
                          <Button size="sm">Track Shipment</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border rounded-md overflow-hidden">
                      <div className="h-40 bg-gray-100 flex items-center justify-center relative">
                        <Package className="h-12 w-12 text-gray-400" />
                        <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-8 w-8 text-rose-500">
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Wishlist Product {i + 1}</h3>
                        <p className="text-sm text-gray-500 mt-1">Premium packaging solution</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-medium">₹{(300 + i * 200).toFixed(2)}</span>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
