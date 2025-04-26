
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  shortDescription: z.string().min(1, { message: 'Short description is required' }),
  fullDescription: z.string().min(20, { message: 'Full description must be at least 20 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number' }),
  salePrice: z.coerce.number().optional(),
  inventoryQuantity: z.coerce.number().min(0, { message: 'Inventory must be a positive number' }),
  backorderable: z.boolean(),
  weight: z.coerce.number().min(0, { message: 'Weight must be a positive number' }),
  length: z.coerce.number().min(0, { message: 'Length must be a positive number' }),
  width: z.coerce.number().min(0, { message: 'Width must be a positive number' }),
  height: z.coerce.number().min(0, { message: 'Height must be a positive number' }),
  isActive: z.boolean(),
  hasVariants: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const AddProduct: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sku: '',
      shortDescription: '',
      fullDescription: '',
      category: '',
      price: 0,
      salePrice: undefined,
      inventoryQuantity: 0,
      backorderable: false,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      isActive: true,
      hasVariants: false,
    },
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real application, this would upload images and submit to an API
      console.log('Adding product:', { ...values, images: uploadedImages });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful product creation
      toast({
        title: 'Product added successfully',
        description: 'Your product has been added to the catalog.',
      });
      
      // Reset form and images
      form.reset();
      setUploadedImages([]);
    } catch (error) {
      console.error('Product creation error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to add product',
        description: 'There was a problem adding your product. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="nexus-page-title">Add New Product</h1>
              <p className="text-gray-600">Create a new product listing for your business</p>
            </div>
            <Button type="submit" form="product-form">
              <Plus className="h-4 w-4 mr-2" />
              Save Product
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Form {...form}>
              <form id="product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Information Column */}
                  <div className="lg:col-span-2 space-y-6 p-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Basic Information</h2>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter unique SKU" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief product description" {...field} />
                            </FormControl>
                            <FormDescription>
                              A concise summary shown in product listings
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fullDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed product description" 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cat_1">Packaging Machines</SelectItem>
                                <SelectItem value="cat_2">Packaging Materials</SelectItem>
                                <SelectItem value="cat_3">Spare Parts</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h2 className="text-xl font-semibold">Pricing & Inventory</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="salePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sale Price (₹) (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  step="0.01" 
                                  placeholder="Leave blank if no sale" 
                                  {...field} 
                                  value={field.value || ''} 
                                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="inventoryQuantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Inventory Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="backorderable"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-6">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Available on backorder
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h2 className="text-xl font-semibold">Shipping Information</h2>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="length"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Length (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="width"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Width (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Image & Settings Column */}
                  <div className="space-y-6 p-6 bg-gray-50 rounded-r-lg">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Product Images</h2>
                      
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Input 
                            id="product-images" 
                            type="file" 
                            accept="image/*" 
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <label 
                            htmlFor="product-images" 
                            className="flex flex-col items-center justify-center cursor-pointer py-4"
                          >
                            <Image className="h-12 w-12 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">Click to upload images</span>
                            <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP (Max 5MB)</span>
                          </label>
                        </div>
                        
                        {uploadedImages.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {uploadedImages.map((image, index) => (
                              <div 
                                key={index}
                                className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group"
                              >
                                <img 
                                  src={image} 
                                  alt={`Product image ${index + 1}`} 
                                  className="w-full h-full object-contain"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h2 className="text-xl font-semibold">Product Settings</h2>
                      
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Active Product</FormLabel>
                              <FormDescription>
                                Product will be visible in the catalog
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hasVariants"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Product has variants</FormLabel>
                              <FormDescription>
                                Create size, color or other variants
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end p-6 border-t border-gray-200">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                        Saving Product...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Save Product
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
