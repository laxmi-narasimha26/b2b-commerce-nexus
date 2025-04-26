
import React from 'react';
import { Link } from 'react-router-dom';
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
  Menu
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

const Navigation: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  
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
              <span className="ml-2 text-xl font-semibold text-gray-900">B2B Commerce Nexus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/catalog" className="text-gray-600 hover:text-nexus-600 flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span>Catalog</span>
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-nexus-600 flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link to="/organizations" className="text-gray-600 hover:text-nexus-600 flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>Organizations</span>
            </Link>
            <Link to="/quotes" className="text-gray-600 hover:text-nexus-600 flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Quotes</span>
            </Link>
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
                placeholder="Search products, organizations, orders..."
              />
            </div>
          </div>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="ml-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full">
                    <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help & Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="ml-3">
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
            <Link 
              to="/catalog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-nexus-600 hover:bg-gray-50"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Catalog
              </div>
            </Link>
            
            <Link 
              to="/orders"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-nexus-600 hover:bg-gray-50"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Orders
              </div>
            </Link>
            
            <Link 
              to="/organizations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-nexus-600 hover:bg-gray-50"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Organizations
              </div>
            </Link>
            
            <Link 
              to="/quotes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-nexus-600 hover:bg-gray-50"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Quotes
              </div>
            </Link>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full bg-gray-200 p-1" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Admin User</div>
                  <div className="text-sm font-medium text-gray-500">admin@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
