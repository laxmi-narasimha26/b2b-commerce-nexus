
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/models';
import { orderApi } from '@/services/api';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  TruckIcon,
  PackageCheck,
  AlertCircle,
  XCircle,
  ArrowDownUp,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getOrders();
        setOrders(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Get order status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <PackageCheck className="h-5 w-5 text-green-500" />;
      case 'pending_approval':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'canceled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
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

  // Format order status for display
  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      case 'oldest':
        return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      case 'highest':
        return b.total - a.total;
      case 'lowest':
        return a.total - b.total;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders by order number..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-nexus-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-center">{error}</div>
      ) : sortedOrders.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg">
          <p className="text-gray-500">No orders found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {/* Order number and date */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link to={`/orders/${order.id}`} className="hover:text-nexus-600 transition-colors">
                          {order.orderNumber}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:text-center">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <Badge variant={getStatusVariant(order.status)}>
                      {formatStatus(order.status)}
                    </Badge>
                  </div>

                  {/* Total */}
                  <div className="md:text-center">
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="font-medium">${order.total.toFixed(2)} {order.currencyCode}</p>
                  </div>

                  {/* Payment status */}
                  <div className="md:text-center">
                    <p className="text-xs text-gray-500 mb-1">Payment</p>
                    <Badge variant={order.paymentStatus === 'paid' ? 'secondary' : 'outline'}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Badge>
                  </div>

                  {/* Purchase order number */}
                  <div className="md:text-center lg:text-right">
                    <p className="text-xs text-gray-500 mb-1">PO Number</p>
                    <p>{order.poNumber || "—"}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-5 py-3">
                <div className="flex justify-end w-full">
                  <Button asChild variant="link" size="sm">
                    <Link to={`/orders/${order.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
