
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requiredRole
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-nexus-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were
    // trying to go to so we can send them there after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check for required role if specified
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h1 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h1>
          <p className="text-red-600 mb-4">
            You don't have permission to access this page. This area is restricted to {requiredRole} users only.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // If authenticated and has required role (or no role required), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
