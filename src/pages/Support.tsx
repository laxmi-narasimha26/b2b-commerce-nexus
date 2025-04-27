
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Helmet } from 'react-helmet-async';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Building2, Mail, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

// Define the form schema
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  subject: z
    .string()
    .min(3, { message: 'Subject is required and must be at least 3 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message is required and must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Support: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user ? `${user.firstName} ${user.lastName}` : '',
      email: user?.email || '',
      subject: '',
      message: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      console.log('Support request submitted:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Message sent successfully',
        description: 'We will get back to you as soon as possible.',
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to send message',
        description: 'Please try again later.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Support | Benz Packaging Solutions</title>
        <meta name="description" content="Contact our support team for assistance with your packaging needs." />
      </Helmet>
      
      <Navigation />
      
      <main className="nexus-container py-8">
        <div className="mb-6 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
          <p className="mt-4 text-lg text-gray-600">
            Need assistance with your order or have questions about our products?
            Our team is here to help.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-nexus-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">support@benzpackaging.com</p>
                    <p className="mt-1 text-sm text-gray-500">We aim to respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-nexus-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">+91 (123) 456-7890</p>
                    <p className="mt-1 text-sm text-gray-500">Mon-Fri: 9AM - 6PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building2 className="h-6 w-6 text-nexus-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Office</h3>
                    <p className="mt-1 text-gray-600">123 Business Park, Tech Hub</p>
                    <p className="text-gray-600">Bangalore, India 560001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-nexus-50 p-6 rounded-lg border border-nexus-100">
              <h3 className="font-medium text-nexus-800 mb-2">Business Inquiries</h3>
              <p className="text-nexus-700 text-sm">
                For business partnerships and bulk ordering, please contact our
                business team directly at <span className="font-medium">business@benzpackaging.com</span>
              </p>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Thank you for reaching out!</h3>
                <p className="mt-2 text-gray-600">
                  Your message has been received. Our support team will get back to you
                  as soon as possible, usually within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send us a message
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your issue or question in detail..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide as much detail as possible so we can best assist you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-lg mb-2">How can I track my order?</h3>
              <p className="text-gray-600">
                You can track your order by logging into your account and navigating to the Orders section. 
                There you'll find tracking information for all your recent orders.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-lg mb-2">What is your return policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy for most items. Custom packaging solutions 
                may have different return terms, please check your specific product details.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">
                Yes, we offer tiered pricing for bulk orders. Business customers can 
                access special pricing through their business dashboard.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-lg mb-2">How can I get a custom quote?</h3>
              <p className="text-gray-600">
                For custom packaging solutions, you can request a quote through your 
                business dashboard or by contacting our sales team directly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
