
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Pages
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Organizations from "./pages/Organizations";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import BusinessRegistration from "./pages/BusinessRegistration";
import AddProduct from "./pages/AddProduct";
import Support from "./pages/Support";

// Role-specific dashboards
import AdminDashboard from "./pages/Admin/Dashboard";
import BusinessDashboard from "./pages/Business/Dashboard";
import CustomerDashboard from "./pages/Customer/Dashboard";

// Admin route guard
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Helmet titleTemplate="%s | Benz Packaging Solutions" defaultTitle="Benz Packaging Solutions">
            <meta name="description" content="Industrial packaging solutions for all your needs" />
          </Helmet>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:slug" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/business/register" element={<BusinessRegistration />} />
              <Route path="/support" element={<Support />} />
              
              {/* Authenticated User Routes - All users */}
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/orders/:orderId" element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/organizations" element={
                <ProtectedRoute>
                  <Organizations />
                </ProtectedRoute>
              } />
              
              {/* Role-specific dashboards */}
              <Route path="/customer/dashboard" element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/business/dashboard" element={
                <ProtectedRoute requiredRole="business">
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/add" element={
                <ProtectedRoute requiredRole="admin">
                  <AddProduct />
                </ProtectedRoute>
              } />
              
              {/* Redirects */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  {({ user }) => {
                    switch(user?.role) {
                      case 'admin': return <Navigate to="/admin/dashboard" replace />;
                      case 'business': return <Navigate to="/business/dashboard" replace />;
                      default: return <Navigate to="/customer/dashboard" replace />;
                    }
                  }}
                </ProtectedRoute>
              } />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
