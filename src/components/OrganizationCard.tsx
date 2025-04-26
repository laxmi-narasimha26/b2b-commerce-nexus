
import React from 'react';
import { Link } from 'react-router-dom';
import { Organization } from '@/types/models';
import { Building2, Users, Phone, Globe, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  // Status badge color
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{organization.name}</CardTitle>
          <Badge variant={getBadgeVariant(organization.status) as any}>
            {organization.status.charAt(0).toUpperCase() + organization.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Code: {organization.code}</p>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="space-y-2">
          {organization.website && (
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 mr-2 text-gray-500" />
              <a 
                href={organization.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-nexus-600 hover:underline"
              >
                {organization.website.replace(/^https?:\/\//i, '')}
              </a>
            </div>
          )}
          
          {organization.phoneNumber && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{organization.phoneNumber}</span>
            </div>
          )}
          
          {organization.creditLimit && (
            <div className="flex items-center text-sm">
              <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
              <span>Credit Limit: ${organization.creditLimit.toLocaleString()}</span>
            </div>
          )}
          
          {organization.paymentTerms && (
            <div className="flex items-center text-sm">
              <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
              <span>Terms: {organization.paymentTerms}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to={`/organizations/${organization.id}`}
          className="w-full text-center py-2 px-4 bg-nexus-50 hover:bg-nexus-100 text-nexus-600 rounded transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
