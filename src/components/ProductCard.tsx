
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant } from '@/types/models';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BarChart3 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  variant?: ProductVariant;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant }) => {
  // If no specific variant is provided, we'll show generic product info
  const displayVariant = variant || {
    id: '',
    productId: product.id,
    sku: product.sku || '',
    position: 0,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 0,
    inventoryQuantity: 0,
    backorderable: false,
    imageUrls: ['/placeholder.svg'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Stock status indicator
  const getStockStatus = () => {
    if (variant) {
      if (variant.inventoryQuantity > 10) return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
      if (variant.inventoryQuantity > 0) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
      return variant.backorderable 
        ? { label: 'Backorder', color: 'bg-blue-100 text-blue-800' } 
        : { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
  };

  const stockStatus = getStockStatus();

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/catalog/${product.slug}`} className="flex-grow">
        <div className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={displayVariant.imageUrls?.[0] || '/placeholder.svg'} 
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="font-medium text-lg truncate hover:text-nexus-600 transition-colors">
            {product.name}
          </h3>
          {product.shortDescription && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.shortDescription}
            </p>
          )}
        </CardHeader>
        
        <CardContent className="pb-2">
          {variant && (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">
                  ${displayVariant.price.toFixed(2)}
                </p>
                <span className={`px-2 py-0.5 rounded-full text-xs ${stockStatus.color}`}>
                  {stockStatus.label}
                </span>
              </div>
              <p className="text-xs text-gray-500">SKU: {displayVariant.sku}</p>
            </>
          )}
        </CardContent>
      </Link>
      
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Quote
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
