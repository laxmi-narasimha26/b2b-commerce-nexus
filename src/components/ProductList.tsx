
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

// Mock data for Benz Packaging Solutions products
const benzPackagingProducts: Product[] = [
  {
    id: 'prod_1',
    sku: 'BP-BW-001',
    name: 'Bubble Wrap Pouch Making Machine',
    slug: 'bubble-wrap-pouch-making-machine',
    shortDescription: 'Automatic Bubble Wrap Pouch Making Machine',
    description: 'Our Bubble Wrap Pouch Making Machine is designed for high-speed production of bubble wrap pouches with precise dimensions. Features adjustable settings for different pouch sizes and automatic sealing.',
    categories: ['cat_1'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/XT/UJ/AY/3682004/bubble-wrap-pouch-making-machine.jpg'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'prod_2',
    sku: 'BP-APM-002',
    name: 'Air Bubble Film Making Machine',
    slug: 'air-bubble-film-making-machine',
    shortDescription: 'Heavy-duty Air Bubble Film Production Equipment',
    description: 'Industrial-grade Air Bubble Film Making Machine capable of producing bubble wrap sheets in various sizes and bubble configurations. Energy-efficient with digital control system.',
    categories: ['cat_1'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/PB/ME/BQ/3682004/air-bubble-film-making-machine.jpg'],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  },
  {
    id: 'prod_3',
    sku: 'BP-EPS-003',
    name: 'EPS Thermocol Disposal Glass Making Machine',
    slug: 'eps-thermocol-disposal-glass-making-machine',
    shortDescription: 'Eco-friendly Thermocol Processing Equipment',
    description: 'This machine converts EPS waste into recyclable products. Features automatic feeding system, precise temperature control, and energy-saving operation.',
    categories: ['cat_1'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/JX/JO/KD/3682004/eps-thermocol-disposal-glass-making-machine.jpg'],
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05')
  },
  {
    id: 'prod_4',
    sku: 'BP-SCF-004',
    name: 'Stretch Film Making Machine',
    slug: 'stretch-film-making-machine',
    shortDescription: 'High-output Stretch Wrap Film Production',
    description: 'Our Stretch Film Making Machine produces high-quality stretch wrap films for industrial packaging. Features adjustable thickness control, multi-layer extrusion, and automatic winding system.',
    categories: ['cat_2'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/LT/KF/IY/3682004/stretch-film-making-machine.jpg'],
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-04-20')
  },
  {
    id: 'prod_5',
    sku: 'BP-BW-005',
    name: 'Bubble Wrap Roll',
    slug: 'bubble-wrap-roll',
    shortDescription: 'Premium Quality Protective Packaging Material',
    description: 'High-quality bubble wrap rolls for secure packaging. Available in various sizes and bubble dimensions. Excellent cushioning properties for fragile item protection.',
    categories: ['cat_2'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/FD/CE/WQ/3682004/bubble-wrap-roll-500x500.jpg'],
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'prod_6',
    sku: 'BP-EPE-006',
    name: 'EPE Foam Roll',
    slug: 'epe-foam-roll',
    shortDescription: 'Expanded Polyethylene Foam for Packaging',
    description: 'Lightweight EPE foam rolls offering superior protection against shock, vibration, and impact damage. Water-resistant and recyclable material.',
    categories: ['cat_2'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/RE/GO/CW/3682004/epe-foam-roll-500x500.jpg'],
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-10')
  },
  {
    id: 'prod_7',
    sku: 'BP-PCM-007',
    name: 'Paper Cup Making Machine',
    slug: 'paper-cup-making-machine',
    shortDescription: 'High-Speed Disposable Cup Manufacturing',
    description: 'Automatic paper cup making machine capable of producing 45-50 cups per minute. Features precise sealing system, PLC control, and photocell detection for accurate cup formation.',
    categories: ['cat_1'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/XA/WT/HI/3682004/paper-cup-making-machine.jpg'],
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-07-05')
  },
  {
    id: 'prod_8',
    sku: 'BP-AFM-008',
    name: 'Air Bubble Film',
    slug: 'air-bubble-film',
    shortDescription: 'Protective Packaging Film',
    description: 'Premium quality air bubble film offering superior protection for fragile items during storage and transportation. Available in various sizes and bubble configurations.',
    categories: ['cat_2'],
    isActive: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/BW/DC/OA/3682004/bubble-wrap-pouches-1000x1000.jpg'],
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15')
  }
];

// Mock data for variants
const mockVariants: Record<string, ProductVariant[]> = {
  'prod_1': [{
    id: 'var_1',
    productId: 'prod_1',
    sku: 'BP-BW-001-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 45000.00,
    inventoryQuantity: 5,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/9/XT/UJ/AY/3682004/bubble-wrap-pouch-making-machine.jpg'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  }],
  'prod_2': [{
    id: 'var_2',
    productId: 'prod_2',
    sku: 'BP-APM-002-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 38000.00,
    inventoryQuantity: 3,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/9/PB/ME/BQ/3682004/air-bubble-film-making-machine.jpg'],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  }],
  'prod_3': [{
    id: 'var_3',
    productId: 'prod_3',
    sku: 'BP-EPS-003-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 52000.00,
    inventoryQuantity: 2,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/9/JX/JO/KD/3682004/eps-thermocol-disposal-glass-making-machine.jpg'],
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05')
  }],
  'prod_4': [{
    id: 'var_4',
    productId: 'prod_4',
    sku: 'BP-SCF-004-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 42000.00,
    inventoryQuantity: 4,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/9/LT/KF/IY/3682004/stretch-film-making-machine.jpg'],
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-04-20')
  }],
  'prod_5': [{
    id: 'var_5',
    productId: 'prod_5',
    sku: 'BP-BW-005-SM',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 250.00,
    inventoryQuantity: 150,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/FD/CE/WQ/3682004/bubble-wrap-roll-500x500.jpg'],
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  }],
  'prod_6': [{
    id: 'var_6',
    productId: 'prod_6',
    sku: 'BP-EPE-006-SM',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 180.00,
    inventoryQuantity: 200,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/RE/GO/CW/3682004/epe-foam-roll-500x500.jpg'],
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-10')
  }],
  'prod_7': [{
    id: 'var_7',
    productId: 'prod_7',
    sku: 'BP-PCM-007-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 35000.00,
    inventoryQuantity: 6,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/9/XA/WT/HI/3682004/paper-cup-making-machine.jpg'],
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-07-05')
  }],
  'prod_8': [{
    id: 'var_8',
    productId: 'prod_8',
    sku: 'BP-AFM-008-SM',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 120.00,
    inventoryQuantity: 300,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/9/BW/DC/OA/3682004/bubble-wrap-pouches-1000x1000.jpg'],
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15')
  }]
};

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
        
        // Use mock data instead of API call for now
        setProducts(benzPackagingProducts);
        setVariants(mockVariants);
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
              <TabsTrigger value="cat_1">Packaging Machines</TabsTrigger>
              <TabsTrigger value="cat_2">Packaging Materials</TabsTrigger>
              <TabsTrigger value="cat_3">Spare Parts</TabsTrigger>
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
