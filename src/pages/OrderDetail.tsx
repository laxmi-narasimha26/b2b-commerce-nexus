
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Order } from '@/types/models';
import { orderApi } from '@/services/api';
import Navigation from '@/components/Navigation';
import { 
  ArrowLeft, 
  Printer, 
  Download,
  TruckIcon,
  ClipboardCheck,
  CreditCard,
  Building2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const data = await orderApi.getOrder(orderId);
        setOrder(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);

  // Format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Get status badge variant
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'processing':
        return 'default';
      case 'shipped':
      case 'delivered':
      case 'approved':
        return 'secondary';
      case 'canceled':
        return 'destructive';
      case 'pending_approval':
      default:
        return 'outline';
    }
  };

  // Format status
  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="nexus-container py-8">
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nexus-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="nexus-container py-8">
          <div className="bg-red-50 text-red-600 p-6 rounded-md">
            <h1 className="text-xl font-semibold mb-2">Error</h1>
            <p>{error || 'Order not found'}</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <Link to="/orders" className="text-sm text-gray-500 hover:text-nexus-600 flex items-center mb-2">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to Orders
            </Link>
            <h1 className="text-2xl font-bold mb-1">Order #{order.orderNumber}</h1>
            <p className="text-sm text-gray-500">Placed on {formatDate(order.orderDate)}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {order.status === 'pending_approval' && (
              <Button size="sm">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Approve Order
              </Button>
            )}
          </div>
        </div>
        
        {/* Status banner */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Badge variant={getStatusVariant(order.status)} className="text-sm py-1 px-3">
              {formatStatus(order.status)}
            </Badge>
            <span className="mx-3 text-gray-300">|</span>
            <div>
              <span className="text-sm text-gray-500 mr-2">Payment:</span>
              <Badge variant={order.paymentStatus === 'paid' ? 'secondary' : 'outline'} className="text-sm">
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </div>
            {order.poNumber && (
              <>
                <span className="mx-3 text-gray-300">|</span>
                <div>
                  <span className="text-sm text-gray-500 mr-2">PO Number:</span>
                  <span className="text-sm font-medium">{order.poNumber}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Order details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main order information */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="items">
              <TabsList className="mb-4">
                <TabsTrigger value="items">Order Items</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="items">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>
                      Items included in this order
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md divide-y">
                      {/* Sample order item rows - in a real app, these would come from API */}
                      <div className="flex justify-between p-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">IMG</span>
                          </div>
                          <div>
                            <p className="font-medium">Enterprise Laptop X1</p>
                            <p className="text-sm text-gray-500">SKU: LAP-X1-001-BLK</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$1,299.99</p>
                          <p className="text-sm text-gray-500">Qty: 1</p>
                        </div>
                      </div>
                      <div className="flex justify-between p-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">IMG</span>
                          </div>
                          <div>
                            <p className="font-medium">Office Desk Pro</p>
                            <p className="text-sm text-gray-500">SKU: DSK-PRO-001</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$299.99</p>
                          <p className="text-sm text-gray-500">Qty: 2</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order summary */}
                    <div className="mt-4 border-t pt-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        {order.taxAmount && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tax</span>
                            <span>${order.taxAmount.toFixed(2)}</span>
                          </div>
                        )}
                        {order.shippingAmount && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shipping</span>
                            <span>${order.shippingAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)} {order.currencyCode}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tracking">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TruckIcon className="h-5 w-5 mr-2" />
                      Shipping & Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {order.status === 'shipped' || order.status === 'delivered' ? (
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Tracking Information</h4>
                          <p className="text-sm mb-1">Carrier: FedEx</p>
                          <p className="text-sm mb-1">Tracking Number: 123456789012</p>
                          <p className="text-sm">Estimated Delivery: {formatDate(new Date())}</p>
                          <Button variant="link" className="p-0 h-auto text-nexus-600 mt-2">
                            Track Package →
                          </Button>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <div className="text-sm">
                            <p>123 Business Street</p>
                            <p>Suite 100</p>
                            <p>San Francisco, CA 94103</p>
                            <p>United States</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No tracking information available yet.</p>
                        {(order.status === 'processing' || order.status === 'approved') && (
                          <p className="text-sm mt-2">Your order is being processed and will be shipped soon.</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="mr-4">
                          <div className="bg-green-100 rounded-full p-2">
                            <ClipboardCheck className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Order placed</p>
                          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      
                      {order.status !== 'pending_approval' && (
                        <div className="flex">
                          <div className="mr-4">
                            <div className="bg-blue-100 rounded-full p-2">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Payment processed</p>
                            <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                          </div>
                        </div>
                      )}
                      
                      {(order.status === 'shipped' || order.status === 'delivered') && (
                        <div className="flex">
                          <div className="mr-4">
                            <div className="bg-purple-100 rounded-full p-2">
                              <TruckIcon className="h-5 w-5 text-purple-600" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Order shipped</p>
                            <p className="text-sm text-gray-500">{formatDate(new Date(order.updatedAt.getTime() + 86400000))}</p>
                          </div>
                        </div>
                      )}
                      
                      {order.status === 'delivered' && (
                        <div className="flex">
                          <div className="mr-4">
                            <div className="bg-green-100 rounded-full p-2">
                              <ClipboardCheck className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Order delivered</p>
                            <p className="text-sm text-gray-500">{formatDate(new Date(order.updatedAt.getTime() + 259200000))}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Acme Corporation</p>
                <p className="text-sm text-gray-500">Account #: ACME</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Contact</h4>
                  <p className="text-sm">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@acme.example.com</p>
                </div>
                <Button variant="link" className="p-0 h-auto text-nexus-600 mt-2">
                  View Company Details →
                </Button>
              </CardContent>
            </Card>
            
            {/* Payment information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm">{order.paymentMethod === 'purchase_order' ? 'Purchase Order' : 'Credit Card'}</p>
                  </div>
                  
                  {order.poNumber && (
                    <div>
                      <p className="text-sm font-medium">PO Number</p>
                      <p className="text-sm">{order.poNumber}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium">Payment Status</p>
                    <Badge variant={order.paymentStatus === 'paid' ? 'secondary' : 'outline'} className="mt-1">
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
