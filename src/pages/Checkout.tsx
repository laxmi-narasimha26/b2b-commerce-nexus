
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Building2, Truck, ClipboardCheck } from 'lucide-react';

// Define form schema
const formSchema = z.object({
  shippingMethod: z.enum(['standard', 'express', 'overnight']),
  paymentMethod: z.enum(['credit_card', 'purchase_order']),
  poNumber: z.string().optional(),
  shippingAddress: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    street: z.string().min(1, { message: 'Street address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string().min(1, { message: 'ZIP code is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
  creditCard: z.object({
    number: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
  notes: z.string().optional(),
}).refine(
  data => {
    if (data.paymentMethod === 'purchase_order') {
      return !!data.poNumber;
    }
    return true;
  },
  {
    message: "PO Number is required for Purchase Order payment method",
    path: ["poNumber"],
  }
);

type FormValues = z.infer<typeof formSchema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample cart items
  const cartItems = [
    {
      id: 'item_1',
      name: 'Enterprise Laptop X1',
      variant: 'Black',
      sku: 'LAP-X1-001-BLK',
      quantity: 1,
      unitPrice: 1299.99,
      totalPrice: 1299.99,
    },
    {
      id: 'item_2',
      name: 'Office Desk Pro',
      variant: 'Oak',
      sku: 'DSK-PRO-001',
      quantity: 2,
      unitPrice: 299.99,
      totalPrice: 599.98,
    }
  ];
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxRate = 0.08; // 8% tax rate
  const tax = subtotal * taxRate;
  const shippingRates = {
    standard: 15.00,
    express: 25.00,
    overnight: 45.00,
  };

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingMethod: 'standard',
      paymentMethod: 'credit_card',
      shippingAddress: {
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
      notes: '',
    },
  });
  
  const watchPaymentMethod = form.watch('paymentMethod');
  const watchShippingMethod = form.watch('shippingMethod');
  const shippingCost = shippingRates[watchShippingMethod as keyof typeof shippingRates];
  const total = subtotal + tax + shippingCost;

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('Checkout submission:', values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful checkout
      toast({
        title: 'Order placed successfully!',
        description: 'Your order has been submitted and is being processed.',
      });
      
      // Redirect to order confirmation
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: 'destructive',
        title: 'Checkout failed',
        description: 'There was a problem processing your order. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="nexus-container py-8">
        <h1 className="nexus-page-title mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Shipping Information
                  </h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="shippingAddress.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shippingAddress.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shippingAddress.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shippingAddress.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="shippingAddress.zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="shippingAddress.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Mexico">Mexico</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Shipping Method */}
                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem className="mt-6">
                          <FormLabel className="text-lg font-medium">Shipping Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3 mt-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="standard" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <span className="font-medium">Standard Shipping</span>
                                  <span className="ml-1 text-gray-500">- 3-5 business days</span>
                                  <span className="ml-2">${shippingRates.standard.toFixed(2)}</span>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="express" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <span className="font-medium">Express Shipping</span>
                                  <span className="ml-1 text-gray-500">- 1-2 business days</span>
                                  <span className="ml-2">${shippingRates.express.toFixed(2)}</span>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="overnight" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <span className="font-medium">Overnight Shipping</span>
                                  <span className="ml-1 text-gray-500">- Next business day</span>
                                  <span className="ml-2">${shippingRates.overnight.toFixed(2)}</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Information
                  </h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium">Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3 mt-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="credit_card" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <span className="font-medium">Credit Card</span>
                                </FormLabel>
                              </FormItem>
                              
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="purchase_order" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <span className="font-medium">Purchase Order</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchPaymentMethod === 'credit_card' && (
                      <div className="pt-3 space-y-4">
                        <FormField
                          control={form.control}
                          name="creditCard.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name on Card</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="creditCard.number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="creditCard.expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiration Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="creditCard.cvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {watchPaymentMethod === 'purchase_order' && (
                      <div className="pt-3">
                        <FormField
                          control={form.control}
                          name="poNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Purchase Order Number</FormLabel>
                              <FormControl>
                                <Input placeholder="PO-12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Special instructions for your order" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="lg:hidden">
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ClipboardCheck className="mr-2 h-5 w-5" />
                        Place Order - ${total.toFixed(2)}
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Order Summary
              </h2>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.variant} • SKU: {item.sku}
                      </p>
                      <p className="text-sm">
                        ${item.unitPrice.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-medium">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <ClipboardCheck className="mr-2 h-5 w-5" />
                      Place Order
                    </div>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
