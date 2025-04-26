
import React, { useState, useEffect } from 'react';
import { Organization } from '@/types/models';
import { organizationApi } from '@/services/api';
import OrganizationCard from './OrganizationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

const OrganizationList: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await organizationApi.getOrganizations();
        setOrganizations(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to load organizations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrganizations();
  }, []);

  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(
    org => org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           org.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-nexus-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-center">{error}</div>
      ) : filteredOrganizations.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg">
          <p className="text-gray-500">No organizations found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
