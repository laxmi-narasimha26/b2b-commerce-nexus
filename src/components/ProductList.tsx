
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

// Updated mock data with comprehensive product catalog from Benz Packaging Solutions
const benzPackagingProducts: Product[] = [
  // Packaging Machines Category
  {
    id: 'pm_1',
    sku: 'BPS-ABFM-001',
    name: 'Automatic Bubble Film Making Machine',
    slug: 'automatic-bubble-film-making-machine',
    shortDescription: 'High-performance industrial bubble film manufacturing machine',
    description: 'Our Automatic Bubble Film Making Machine is designed for producing high-quality air bubble sheets and films with precision control system and stable performance. Ideal for packaging industry requiring protective materials.',
    categories: ['cat_packaging_machines'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3823480/air-bubble-film-making-machine-500x500.jpg'],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-15')
  },
  {
    id: 'pm_2',
    sku: 'BPS-ABSP-002',
    name: 'Air Bubble Sheet Plant',
    slug: 'air-bubble-sheet-plant',
    shortDescription: 'Complete production line for air bubble sheet manufacturing',
    description: 'Complete air bubble sheet manufacturing plant with extruder, bubble forming unit, and winding system. This plant is suitable for producing packaging materials with efficient production capabilities.',
    categories: ['cat_packaging_machines'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/3/UP/OW/OG/3823480/air-bubble-sheet-plant-500x500.jpg'],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-15')
  },
  {
    id: 'pm_3',
    sku: 'BPS-EFMM-003',
    name: 'EPE Foam Sheet Making Machine',
    slug: 'epe-foam-sheet-making-machine',
    shortDescription: 'Advanced EPE foam sheet extrusion system',
    description: 'Advanced EPE foam sheet extrusion line with precise thickness control. Produces high-quality foam sheets for packaging applications with adjustable density and thickness.',
    categories: ['cat_packaging_machines'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/3/UT/PO/OL/3823480/epe-foam-sheet-making-machine-500x500.jpg'],
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20')
  },
  {
    id: 'pm_4',
    sku: 'BPS-LDPE-004',
    name: 'LDPE Foam Sheet Machine',
    slug: 'ldpe-foam-sheet-machine',
    shortDescription: 'State-of-the-art LDPE foam extrusion technology',
    description: 'High-efficiency LDPE foam sheet manufacturing machine producing quality foam sheets with excellent cushioning properties for packaging applications.',
    categories: ['cat_packaging_machines'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/3/HV/XM/AW/3823480/ldpe-foam-sheet-machine-500x500.jpg'],
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20')
  },
  
  // Packaging Materials Category
  {
    id: 'pm_5',
    sku: 'BPS-ABFR-001',
    name: 'Air Bubble Film Roll',
    slug: 'air-bubble-film-roll',
    shortDescription: 'High-quality protective bubble wrap rolls',
    description: 'Premium quality air bubble film rolls providing excellent cushioning and protection for fragile items during storage and transportation. Available in various sizes and thicknesses.',
    categories: ['cat_packaging_materials'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/3/VN/VM/ZD/3823480/air-bubble-film-roll-500x500.jpg'],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01')
  },
  {
    id: 'pm_6',
    sku: 'BPS-EFER-002',
    name: 'EPE Foam Roll',
    slug: 'epe-foam-roll',
    shortDescription: 'Expandable polyethylene foam for secure packaging',
    description: 'High-quality EPE foam rolls offering superior cushioning and protection for products. Ideal for packaging fragile items and protecting against impacts during shipping.',
    categories: ['cat_packaging_materials'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/3/QD/UZ/JU/3823480/epe-foam-roll-500x500.jpg'],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01')
  },
  {
    id: 'pm_7',
    sku: 'BPS-VCIF-003',
    name: 'VCI Film Roll',
    slug: 'vci-film-roll',
    shortDescription: 'Volatile Corrosion Inhibitor film for metal protection',
    description: 'Specialized VCI Film Rolls designed to prevent corrosion on metal surfaces during storage and transportation. Features advanced corrosion inhibitor technology.',
    categories: ['cat_packaging_materials'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/YP/VO/GF/3682004/vci-film-roll.jpg'],
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05')
  },
  {
    id: 'pm_8',
    sku: 'BPS-PFRL-004',
    name: 'Polyethylene Film Roll',
    slug: 'polyethylene-film-roll',
    shortDescription: 'Versatile PE film for general packaging needs',
    description: 'Durable polyethylene film rolls for various packaging applications. Provides moisture resistance and protection for products in different environments.',
    categories: ['cat_packaging_materials'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/XC/OJ/TG/3682004/vci-polyethylene-film-roll.jpg'],
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05')
  },
  
  // Protective Packaging Category
  {
    id: 'pp_1',
    sku: 'BPS-MADB-001',
    name: 'Moisture Absorber Desiccant Bag',
    slug: 'moisture-absorber-desiccant-bag',
    shortDescription: 'Industrial-grade moisture control solution',
    description: 'High-performance moisture absorber desiccant bags for effective humidity control in packaging. Prevents moisture damage during storage and shipping.',
    categories: ['cat_protective_packaging'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/KL/PQ/OG/3682004/moisture-absorber-desiccant-bag.jpg'],
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10')
  },
  {
    id: 'pp_2',
    sku: 'BPS-PSDB-002',
    name: 'Propsec Desiccant Bags',
    slug: 'propsec-desiccant-bags',
    shortDescription: 'Premium desiccant solution for sensitive products',
    description: 'Professional-grade desiccant bags for industrial packaging and moisture protection. Ideal for electronics, pharmaceuticals, and other moisture-sensitive products.',
    categories: ['cat_protective_packaging'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/VB/NK/XP/3682004/propsec-desiccant-bags.jpg'],
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10')
  },
  {
    id: 'pp_3',
    sku: 'BPS-BPIT-003',
    name: 'Breathable Poly Insulated Thermal Covers',
    slug: 'breathable-poly-insulated-thermal-covers',
    shortDescription: 'Temperature-controlled shipping solution',
    description: 'Advanced thermal covers providing temperature protection during shipping and storage. Breathable design with excellent insulation properties for sensitive goods.',
    categories: ['cat_protective_packaging'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/1/SG/RE/DW/3682004/breathable-poly-insulated-thermal-covers.jpg'],
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15')
  },
  
  // Adhesive Solutions Category
  {
    id: 'as_1',
    sku: 'BPS-ADPT-001',
    name: 'Adhesive Paper Tape',
    slug: 'adhesive-paper-tape',
    shortDescription: 'Strong paper-based packaging tape',
    description: 'High-quality adhesive paper tape for secure packaging and sealing applications. Features strong adhesion and is environmentally friendly.',
    categories: ['cat_adhesive_solutions'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/TD/AX/YU/3682004/adhesive-paper-tape.jpg'],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  },
  {
    id: 'as_2',
    sku: 'BPS-BPPT-002',
    name: 'BOPP Packaging Tape',
    slug: 'bopp-packaging-tape',
    shortDescription: 'Versatile polypropylene packaging tape',
    description: 'Professional-grade BOPP packaging tape for industrial and commercial applications. Offers strong adhesion and durability for secure package sealing.',
    categories: ['cat_adhesive_solutions'],
    isActive: true,
    hasVariants: true,
    images: ['https://5.imimg.com/data5/SELLER/Default/2021/12/JH/WQ/KL/3682004/bopp-packaging-tape.jpg'],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  }
];

// Mock data for variants
const mockVariants: Record<string, ProductVariant[]> = {
  // Packaging Machines
  'pm_1': [{
    id: 'var_pm_1',
    productId: 'pm_1',
    sku: 'BPS-ABFM-001-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1250000.00,
    inventoryQuantity: 2,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3823480/air-bubble-film-making-machine-500x500.jpg'],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-15')
  }],
  'pm_2': [{
    id: 'var_pm_2',
    productId: 'pm_2',
    sku: 'BPS-ABSP-002-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1850000.00,
    inventoryQuantity: 1,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/3/UP/OW/OG/3823480/air-bubble-sheet-plant-500x500.jpg'],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-15')
  }],
  'pm_3': [{
    id: 'var_pm_3',
    productId: 'pm_3',
    sku: 'BPS-EFMM-003-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1450000.00,
    inventoryQuantity: 2,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/3/UT/PO/OL/3823480/epe-foam-sheet-making-machine-500x500.jpg'],
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20')
  }],
  'pm_4': [{
    id: 'var_pm_4',
    productId: 'pm_4',
    sku: 'BPS-LDPE-004-STD',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1350000.00,
    inventoryQuantity: 1,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/3/HV/XM/AW/3823480/ldpe-foam-sheet-machine-500x500.jpg'],
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20')
  }],
  
  // Packaging Materials
  'pm_5': [{
    id: 'var_pm_5',
    productId: 'pm_5',
    sku: 'BPS-ABFR-001-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1500.00,
    inventoryQuantity: 50,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/3/VN/VM/ZD/3823480/air-bubble-film-roll-500x500.jpg'],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01')
  }],
  'pm_6': [{
    id: 'var_pm_6',
    productId: 'pm_6',
    sku: 'BPS-EFER-002-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1800.00,
    inventoryQuantity: 45,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/3/QD/UZ/JU/3823480/epe-foam-roll-500x500.jpg'],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01')
  }],
  'pm_7': [{
    id: 'var_pm_7',
    productId: 'pm_7',
    sku: 'BPS-VCIF-003-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 2200.00,
    inventoryQuantity: 30,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/YP/VO/GF/3682004/vci-film-roll.jpg'],
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05')
  }],
  'pm_8': [{
    id: 'var_pm_8',
    productId: 'pm_8',
    sku: 'BPS-PFRL-004-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 1600.00,
    inventoryQuantity: 40,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/XC/OJ/TG/3682004/vci-polyethylene-film-roll.jpg'],
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05')
  }],
  
  // Protective Packaging
  'pp_1': [{
    id: 'var_pp_1',
    productId: 'pp_1',
    sku: 'BPS-MADB-001-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 450.00,
    inventoryQuantity: 200,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/KL/PQ/OG/3682004/moisture-absorber-desiccant-bag.jpg'],
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10')
  }],
  'pp_2': [{
    id: 'var_pp_2',
    productId: 'pp_2',
    sku: 'BPS-PSDB-002-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 550.00,
    inventoryQuantity: 180,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/VB/NK/XP/3682004/propsec-desiccant-bags.jpg'],
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10')
  }],
  'pp_3': [{
    id: 'var_pp_3',
    productId: 'pp_3',
    sku: 'BPS-BPIT-003-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 2500.00,
    inventoryQuantity: 25,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2022/1/SG/RE/DW/3682004/breathable-poly-insulated-thermal-covers.jpg'],
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15')
  }],
  
  // Adhesive Solutions
  'as_1': [{
    id: 'var_as_1',
    productId: 'as_1',
    sku: 'BPS-ADPT-001-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 180.00,
    inventoryQuantity: 250,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/TD/AX/YU/3682004/adhesive-paper-tape.jpg'],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  }],
  'as_2': [{
    id: 'var_as_2',
    productId: 'as_2',
    sku: 'BPS-BPPT-002-S',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [],
    price: 220.00,
    inventoryQuantity: 220,
    backorderable: true,
    imageUrls: ['https://5.imimg.com/data5/SELLER/Default/2021/12/JH/WQ/KL/3682004/bopp-packaging-tape.jpg'],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  }]
};

// ProductList component
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
      case 'price_asc':
        const aPrice = variants[a.id]?.[0]?.price || 0;
        const bPrice = variants[b.id]?.[0]?.price || 0;
        return aPrice - bPrice;
      case 'price_desc':
        const cPrice = variants[a.id]?.[0]?.price || 0;
        const dPrice = variants[b.id]?.[0]?.price || 0;
        return dPrice - cPrice;
      case 'created_desc':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'created_asc':
        return a.createdAt.getTime() - b.createdAt.getTime();
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
              placeholder="Search products by name, description or SKU..."
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
                <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                <SelectItem value="created_desc">Newest first</SelectItem>
                <SelectItem value="created_asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-2">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="cat_packaging_machines">Packaging Machines</TabsTrigger>
              <TabsTrigger value="cat_packaging_materials">Packaging Materials</TabsTrigger>
              <TabsTrigger value="cat_protective_packaging">Protective Packaging</TabsTrigger>
              <TabsTrigger value="cat_adhesive_solutions">Adhesive Solutions</TabsTrigger>
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
            const defaultVariant = productVariants.find(v => v.isDefault) || productVariants[0];
            
            return (
              <Link to={`/catalog/${product.slug}`} key={product.id} className="block h-full">
                <ProductCard 
                  product={product}
                  variant={defaultVariant}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
