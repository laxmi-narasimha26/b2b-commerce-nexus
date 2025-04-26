
import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/models';
import { productApi } from '@/services/api';
import ProductCard from './ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Record<string, ProductVariant[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('name_asc');

  // Fetch products and their variants
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Get all products
        const response = await productApi.getProducts();
        setProducts(response.data);
        
        // Get variants for each product
        const variantsObj: Record<string, ProductVariant[]> = {};
        for (const product of response.data) {
          const productVariants = await productApi.getProductVariants(product.id);
          variantsObj[product.id] = productVariants;
        }
        
        setVariants(variantsObj);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.categories?.includes(selectedCategory);
      
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'created_asc':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'created_desc':
        return b.createdAt.getTime() - a.createdAt.getTime();
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
              placeholder="Search products..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                <SelectItem value="created_desc">Newest first</SelectItem>
                <SelectItem value="created_asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-4">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="cat_1">Electronics</TabsTrigger>
              <TabsTrigger value="cat_2">Office Supplies</TabsTrigger>
              <TabsTrigger value="cat_3">Industrial</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-nexus-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-center">{error}</div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            // Get the default variant for this product
            const productVariants = variants[product.id] || [];
            const defaultVariant = productVariants.find(v => v.isDefault);
            
            return (
              <ProductCard 
                key={product.id} 
                product={product}
                variant={defaultVariant}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
