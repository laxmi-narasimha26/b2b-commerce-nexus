import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Building2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Helmet } from 'react-helmet-async';

// Define the form schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to send a password reset email
      console.log('Password reset requested for:', values.email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show toast and set submitted state
      toast({
        title: 'Password reset link sent',
        description: 'Check your email for instructions to reset your password.',
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to send reset link',
        description: 'Please try again or contact support if the problem persists.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Helmet>
        <title>Forgot Password | Benz Packaging Solutions</title>
      </Helmet>
      
      <div className="w-full max-w-md">
        {/* Logo and app name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <div className="text-nexus-600 bg-nexus-100 p-2 rounded">
              <Building2 className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">Benz Packaging Solutions</h1>
          <p className="text-gray-600 mt-2">Reset your password</p>
        </div>

        {/* Forgot password form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {isSubmitted ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <Mail className="h-4 w-4" />
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>
                  We've sent you a password reset link. Please check your email and follow the instructions.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 mt-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/login">Return to login</Link>
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                      Sending reset link...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Reset Link
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>

        {/* Return to login link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-nexus-600 hover:text-nexus-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
