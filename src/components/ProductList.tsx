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

// Updated mock data with complete product catalog
const benzPackagingProducts: Product[] = [
  // Packaging Roll Category
  {
    id: 'pr_1',
    sku: 'BP-VFR-001',
    name: 'VCI Film Roll',
    slug: 'vci-film-roll',
    shortDescription: 'High-quality VCI Film Roll for industrial packaging',
    description: 'Premium VCI Film Roll designed for corrosion protection and secure packaging. Ideal for industrial use with excellent durability.',
    categories: ['cat_packaging_roll'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/YP/VO/GF/3682004/vci-film-roll.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'pr_2',
    sku: 'BP-PFR-002',
    name: 'VCI Polyethylene Film Roll',
    slug: 'vci-polyethylene-film-roll',
    shortDescription: 'Durable VCI Polyethylene Film Roll',
    description: 'High-performance VCI Polyethylene Film Roll offering superior protection and durability for industrial packaging needs.',
    categories: ['cat_packaging_roll'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/XC/OJ/TG/3682004/vci-polyethylene-film-roll.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'pr_3',
    sku: 'BP-PCR-003',
    name: 'Poly Coated Paper Roll',
    slug: 'poly-coated-paper-roll',
    shortDescription: 'Professional Poly Coated Paper Roll',
    description: 'Premium quality Poly Coated Paper Roll, perfect for packaging applications requiring moisture resistance.',
    categories: ['cat_packaging_roll'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/RU/BH/ZL/3682004/poly-coated-paper-roll.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  
  // VCI Film Category
  {
    id: 'vf_1',
    sku: 'BP-CPF-001',
    name: 'Corrosion Protection VCI Films',
    slug: 'corrosion-protection-vci-films',
    shortDescription: 'Advanced Corrosion Protection Films',
    description: 'Industrial-grade VCI films specially designed for corrosion protection of metal parts and equipment.',
    categories: ['cat_vci_film'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/PP/FX/RB/3682004/corrosion-protection-vci-films.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'vf_2',
    sku: 'BP-VPF-002',
    name: 'VCI Protective Film',
    slug: 'vci-protective-film',
    shortDescription: 'Versatile VCI Protection Film',
    description: 'Multipurpose VCI protective film offering superior corrosion protection for various industrial applications.',
    categories: ['cat_vci_film'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/QW/OL/XM/3682004/vci-protective-film.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // Desiccant Bags Category
  {
    id: 'db_1',
    sku: 'BP-MAD-001',
    name: 'Moisture Absorber Desiccant Bag',
    slug: 'moisture-absorber-desiccant-bag',
    shortDescription: 'Professional Moisture Control Solution',
    description: 'High-performance moisture absorber desiccant bags for effective humidity control in packaging.',
    categories: ['cat_desiccant'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/KL/PQ/OG/3682004/moisture-absorber-desiccant-bag.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'db_2',
    sku: 'BP-PDB-002',
    name: 'Propsec Desiccant Bags',
    slug: 'propsec-desiccant-bags',
    shortDescription: 'Industrial Grade Desiccant Solution',
    description: 'Professional-grade desiccant bags designed for industrial packaging and moisture protection.',
    categories: ['cat_desiccant'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/VB/NK/XP/3682004/propsec-desiccant-bags.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  // Adhesive Tape Category
  {
    id: 'at_1',
    sku: 'BP-APT-001',
    name: 'Adhesive Paper Tape',
    slug: 'adhesive-paper-tape',
    shortDescription: 'Professional Paper Packaging Tape',
    description: 'High-quality adhesive paper tape for secure packaging and sealing applications.',
    categories: ['cat_adhesive'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/TD/AX/YU/3682004/adhesive-paper-tape.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'at_2',
    sku: 'BP-BPT-002',
    name: 'BOPP Packaging Tape',
    slug: 'bopp-packaging-tape',
    shortDescription: 'Premium BOPP Packaging Solution',
    description: 'Professional-grade BOPP packaging tape for industrial and commercial applications.',
    categories: ['cat_adhesive'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/JH/WQ/KL/3682004/bopp-packaging-tape.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

// Mock data for variants
const mockVariants: Record<string, ProductVariant[]> = {
  'pr_1': [{
    id: 'var_pr_1',
    productId: 'pr_1',
    sku: 'BP-VFR-001-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 150.00,
    inventoryQuantity: 100,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/YP/VO/GF/3682004/vci-film-roll.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'pr_2': [{
    id: 'var_pr_2',
    productId: 'pr_2',
    sku: 'BP-PFR-002-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 180.00,
    inventoryQuantity: 120,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/XC/OJ/TG/3682004/vci-polyethylene-film-roll.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'pr_3': [{
    id: 'var_pr_3',
    productId: 'pr_3',
    sku: 'BP-PCR-003-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 200.00,
    inventoryQuantity: 90,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/RU/BH/ZL/3682004/poly-coated-paper-roll.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'vf_1': [{
    id: 'var_vf_1',
    productId: 'vf_1',
    sku: 'BP-CPF-001-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 250.00,
    inventoryQuantity: 75,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/PP/FX/RB/3682004/corrosion-protection-vci-films.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'vf_2': [{
    id: 'var_vf_2',
    productId: 'vf_2',
    sku: 'BP-VPF-002-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 220.00,
    inventoryQuantity: 80,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/QW/OL/XM/3682004/vci-protective-film.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'db_1': [{
    id: 'var_db_1',
    productId: 'db_1',
    sku: 'BP-MAD-001-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 50.00,
    inventoryQuantity: 200,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/KL/PQ/OG/3682004/moisture-absorber-desiccant-bag.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'db_2': [{
    id: 'var_db_2',
    productId: 'db_2',
    sku: 'BP-PDB-002-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 60.00,
    inventoryQuantity: 180,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/VB/NK/XP/3682004/propsec-desiccant-bags.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'at_1': [{
    id: 'var_at_1',
    productId: 'at_1',
    sku: 'BP-APT-001-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 30.00,
    inventoryQuantity: 250,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/TD/AX/YU/3682004/adhesive-paper-tape.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }],
  'at_2': [{
    id: 'var_at_2',
    productId: 'at_2',
    sku: 'BP-BPT-002-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 40.00,
    inventoryQuantity: 220,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/JH/WQ/KL/3682004/bopp-packaging-tape.jpg'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }]
};

// Update the category tabs to match the new product categories
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

        <div className="mt-4">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="cat_packaging_roll">Packaging Rolls</TabsTrigger>
              <TabsTrigger value="cat_vci_film">VCI Films</TabsTrigger>
              <TabsTrigger value="cat_desiccant">Desiccant Bags</TabsTrigger>
              <TabsTrigger value="cat_adhesive">Adhesive Tapes</TabsTrigger>
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
