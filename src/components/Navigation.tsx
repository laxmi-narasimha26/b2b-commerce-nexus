
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  ShoppingCart, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  Search,
  Bell,
  User,
  Menu,
  LogOut,
  Home,
  LayoutDashboard
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navigation: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { user, isAuthenticated, logout, dashboardURL } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Get navigation links based on user role
  const getNavigationLinks = () => {
    const commonLinks = [
      {
        to: '/catalog',
        label: 'Catalog',
        icon: Package,
      },
      {
        to: '/orders',
        label: 'Orders',
        icon: FileText,
      }
    ];
    
    if (!user?.role || user.role === 'customer') {
      return commonLinks;
    }
    
    if (user.role === 'business') {
      return [
        ...commonLinks,
        {
          to: '/organizations',
          label: 'Organization',
          icon: Building2,
        }
      ];
    }
    
    if (user.role === 'admin') {
      return [
        ...commonLinks,
        {
          to: '/organizations',
          label: 'Organizations',
          icon: Building2,
        },
        {
          to: '/admin/dashboard',
          label: 'Admin',
          icon: LayoutDashboard,
        }
      ];
    }
    
    return commonLinks;
  };
  
  const navigationLinks = getNavigationLinks();
  
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="nexus-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-nexus-600 bg-nexus-100 p-1 rounded">
                <Building2 className="h-8 w-8" />
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Benz Packaging</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`text-gray-600 hover:text-nexus-600 flex items-center gap-1 ${
                  location.pathname === link.to ? 'text-nexus-600 font-medium' : ''
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link to={dashboardURL} className={`text-gray-600 hover:text-nexus-600 flex items-center gap-1 ${
                location.pathname.includes('/dashboard') ? 'text-nexus-600 font-medium' : ''
              }`}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-nexus-500 focus:border-nexus-500"
                placeholder="Search products, orders..."
              />
            </div>
          </div>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center">
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
            )}
            
            <div className="ml-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full">
                      <div className="flex items-center">
                        <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                        <span className="ml-2 font-medium">{user?.firstName}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={dashboardURL} className="flex w-full cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button asChild variant="ghost">
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
            
            {isAuthenticated && (
              <div className="ml-3">
                <Link to="/checkout">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <Link to="/checkout" className="mr-2">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-nexus-600 hover:bg-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <div className="flex items-center">
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.label}
                </div>
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link 
                to={dashboardURL}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-nexus-600 hover:bg-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <div className="flex items-center">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </div>
              </Link>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <User className="h-10 w-10 rounded-full bg-gray-200 p-1" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.firstName} {user?.lastName}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      handleLogout();
                      setIsMobileNavOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-1 px-3">
                <Button 
                  asChild 
                  className="w-full mb-2"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
