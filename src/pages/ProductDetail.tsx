import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Product, ProductVariant } from '@/types/models';
import { productApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BarChart3, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Helmet as HelmetAsync } from 'react-helmet-async';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // In a real app, we'd fetch by slug
        const allProducts = await productApi.getProducts();
        const foundProduct = allProducts.data.find(p => p.slug === slug);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Get variants for this product
          const productVariants = await productApi.getProductVariants(foundProduct.id);
          setVariants(productVariants);
          
          // Set default variant
          const defaultVariant = productVariants.find(v => v.isDefault) || productVariants[0];
          if (defaultVariant) {
            setSelectedVariant(defaultVariant);
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchProductDetails();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      toast({
        title: "Added to cart",
        description: `${product.name} x${quantity} added to your cart`,
      });
    }
  };

  const handleRequestQuote = () => {
    if (product) {
      toast({
        title: "Quote requested",
        description: "We'll contact you shortly with a personalized quote",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="nexus-container py-8">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nexus-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="nexus-container py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/catalog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Catalog
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HelmetAsync>
        <title>{product.name} | Benz Packaging Solutions</title>
        <meta name="description" content={product.shortDescription} />
      </HelmetAsync>
      
      <Navigation />
      
      <main className="nexus-container py-8">
        <div className="mb-4">
          <Link to="/catalog" className="text-nexus-600 hover:text-nexus-700 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Catalog
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
              <img 
                src={selectedVariant?.imageUrls?.[0] || product.images?.[0] || '/placeholder.svg'} 
                alt={product.name}
                className="object-contain max-h-96 w-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
              
              {selectedVariant && (
                <div className="mt-4">
                  <p className="text-2xl font-bold text-nexus-600">₹{selectedVariant.price.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-gray-500 mt-1">SKU: {selectedVariant.sku}</p>
                  
                  <div className="mt-2">
                    {selectedVariant.inventoryQuantity > 10 ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">In Stock</span>
                    ) : selectedVariant.inventoryQuantity > 0 ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Low Stock</span>
                    ) : selectedVariant.backorderable ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Backorder</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">Out of Stock</span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mt-6 flex items-center">
                <div className="mr-4">
                  <label htmlFor="quantity" className="sr-only">Quantity</label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      type="button"
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value || '1', 10))}
                      className="w-12 text-center border-0"
                    />
                    <button 
                      type="button"
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || selectedVariant.inventoryQuantity <= 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleRequestQuote}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <Tabs defaultValue="details" className="p-6">
              <TabsList>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="application">Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="py-4">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="py-4">
                <div className="prose max-w-none">
                  <p>Product specifications will be listed here.</p>
                </div>
              </TabsContent>
              <TabsContent value="application" className="py-4">
                <div className="prose max-w-none">
                  <p>Common applications and use cases for this product.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
