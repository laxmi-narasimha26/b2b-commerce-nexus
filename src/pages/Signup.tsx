
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Building2, UserPlus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

// Define the form schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  companyName: z
    .string()
    .min(1, { message: 'Company name is required' }),
  phone: z
    .string()
    .optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm your password' }),
  terms: z
    .boolean()
    .refine(val => val === true, { message: 'You must accept the terms and conditions' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an actual API call
      console.log('Signup attempt with:', values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful signup
      toast({
        title: 'Account created successfully',
        description: 'Welcome to B2B Commerce Nexus!',
      });
      
      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: 'There was a problem creating your account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and app name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <div className="text-nexus-600 bg-nexus-100 p-2 rounded">
              <Building2 className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">B2B Commerce Nexus</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Signup form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@yourcompany.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company, Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number <span className="text-gray-500 text-sm">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      At least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to the{' '}
                        <Link to="/terms" className="text-nexus-600 hover:text-nexus-500">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-nexus-600 hover:text-nexus-500">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Login link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-nexus-600 hover:text-nexus-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
