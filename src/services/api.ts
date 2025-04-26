
/**
 * B2B Commerce Nexus - API Service
 * 
 * This module provides interfaces for interacting with the B2B Commerce Nexus API.
 * In a real implementation, these methods would connect to a backend API.
 * 
 * For demonstration purposes, we'll simulate API responses with mock data.
 */

import { 
  Organization, 
  User, 
  Product, 
  ProductVariant, 
  Order, 
  PaginatedResponse,
  SavedList,
  Cart,
  RequestForQuote,
  ProductCategory
} from '../types/models';

// Base API configuration
const API_DELAY = 500; // Simulated network delay in ms

// Generic API response handler
const createApiResponse = async <T>(data: T, error = false): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  if (error) {
    throw new Error('API Error: Something went wrong');
  }
  
  return data;
};

// ==================== Organization API ====================

export const organizationApi = {
  getOrganizations: async (): Promise<PaginatedResponse<Organization>> => {
    return createApiResponse<PaginatedResponse<Organization>>({
      data: mockOrganizations,
      total: mockOrganizations.length,
      page: 1,
      pageSize: 10,
      totalPages: 1
    });
  },
  
  getOrganization: async (id: string): Promise<Organization> => {
    const org = mockOrganizations.find(org => org.id === id);
    if (!org) {
      return createApiResponse(null as unknown as Organization, true);
    }
    return createApiResponse(org);
  },
  
  createOrganization: async (data: Partial<Organization>): Promise<Organization> => {
    const newOrg: Organization = {
      id: `org_${Date.now()}`,
      name: data.name || 'New Organization',
      code: data.code || `ORG-${Math.floor(Math.random() * 10000)}`,
      status: data.status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return createApiResponse(newOrg);
  },
  
  updateOrganization: async (id: string, data: Partial<Organization>): Promise<Organization> => {
    const org = mockOrganizations.find(org => org.id === id);
    if (!org) {
      return createApiResponse(null as unknown as Organization, true);
    }
    
    const updatedOrg = { ...org, ...data, updatedAt: new Date() };
    return createApiResponse(updatedOrg);
  },
  
  getOrganizationUsers: async (orgId: string): Promise<PaginatedResponse<User>> => {
    const users = mockUsers.filter(user => 
      mockOrgUsers.some(ou => ou.organizationId === orgId && ou.userId === user.id)
    );
    
    return createApiResponse({
      data: users,
      total: users.length,
      page: 1,
      pageSize: 10,
      totalPages: 1
    });
  }
};

// ==================== Product API ====================

export const productApi = {
  getProducts: async (): Promise<PaginatedResponse<Product>> => {
    return createApiResponse<PaginatedResponse<Product>>({
      data: mockProducts,
      total: mockProducts.length,
      page: 1,
      pageSize: 10,
      totalPages: 1
    });
  },
  
  getProduct: async (id: string): Promise<Product> => {
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      return createApiResponse(null as unknown as Product, true);
    }
    return createApiResponse(product);
  },
  
  getProductVariants: async (productId: string): Promise<ProductVariant[]> => {
    const variants = mockVariants.filter(v => v.productId === productId);
    return createApiResponse(variants);
  },
  
  getCategories: async (): Promise<ProductCategory[]> => {
    return createApiResponse(mockCategories);
  }
};

// ==================== Order API ====================

export const orderApi = {
  getOrders: async (organizationId?: string): Promise<PaginatedResponse<Order>> => {
    let orders = mockOrders;
    
    if (organizationId) {
      orders = orders.filter(order => order.organizationId === organizationId);
    }
    
    return createApiResponse<PaginatedResponse<Order>>({
      data: orders,
      total: orders.length,
      page: 1,
      pageSize: 10,
      totalPages: 1
    });
  },
  
  getOrder: async (id: string): Promise<Order> => {
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      return createApiResponse(null as unknown as Order, true);
    }
    return createApiResponse(order);
  },
  
  createOrder: async (data: Partial<Order>): Promise<Order> => {
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
      organizationId: data.organizationId || '',
      userId: data.userId || '',
      orderDate: new Date(),
      status: 'draft',
      shippingAddressId: data.shippingAddressId || '',
      billingAddressId: data.billingAddressId || '',
      subtotal: data.subtotal || 0,
      total: data.total || 0,
      currencyCode: data.currencyCode || 'USD',
      paymentStatus: 'pending',
      requiresApproval: data.requiresApproval || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return createApiResponse(newOrder);
  }
};

// ==================== Cart API ====================

export const cartApi = {
  getCart: async (userId: string): Promise<Cart | null> => {
    const cart = mockCarts.find(cart => cart.userId === userId && cart.isActive);
    return createApiResponse(cart || null);
  },
  
  addToCart: async (userId: string, productVariantId: string, quantity: number): Promise<Cart> => {
    // Simulated cart update
    return createApiResponse({
      id: `cart_${Date.now()}`,
      userId,
      currencyCode: 'USD',
      isActive: true,
      subtotal: 199.99,
      total: 214.99,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

// ==================== Saved Lists API ====================

export const savedListApi = {
  getSavedLists: async (userId: string): Promise<SavedList[]> => {
    const lists = mockSavedLists.filter(list => list.userId === userId);
    return createApiResponse(lists);
  }
};

// ==================== Quote API ====================

export const quoteApi = {
  getQuotes: async (organizationId: string): Promise<PaginatedResponse<RequestForQuote>> => {
    const quotes = mockRfqs.filter(rfq => rfq.organizationId === organizationId);
    
    return createApiResponse<PaginatedResponse<RequestForQuote>>({
      data: quotes,
      total: quotes.length,
      page: 1,
      pageSize: 10,
      totalPages: 1
    });
  },
  
  createQuote: async (data: Partial<RequestForQuote>): Promise<RequestForQuote> => {
    const newRfq: RequestForQuote = {
      id: `rfq_${Date.now()}`,
      rfqNumber: `RFQ-${Math.floor(Math.random() * 10000)}`,
      organizationId: data.organizationId || '',
      userId: data.userId || '',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return createApiResponse(newRfq);
  }
};

// ==================== Mock Data ====================

const mockOrganizations: Organization[] = [
  {
    id: 'org_1',
    name: 'Acme Corporation',
    code: 'ACME',
    status: 'active',
    website: 'https://acme.example.com',
    phoneNumber: '+1 (555) 123-4567',
    creditLimit: 50000,
    paymentTerms: 'net30',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-22'),
  },
  {
    id: 'org_2',
    name: 'TechSolutions Inc',
    code: 'TECH',
    status: 'active',
    website: 'https://techsolutions.example.com',
    phoneNumber: '+1 (555) 987-6543',
    creditLimit: 75000,
    paymentTerms: 'net60',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-04-18'),
  },
  {
    id: 'org_3',
    name: 'Global Manufacturing',
    code: 'GLOBMFG',
    status: 'active',
    website: 'https://globalmanufacturing.example.com',
    phoneNumber: '+1 (555) 456-7890',
    creditLimit: 100000,
    paymentTerms: 'net30',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-06-12'),
  },
];

const mockUsers: User[] = [
  {
    id: 'user_1',
    email: 'john.doe@acme.example.com',
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
    phoneNumber: '+1 (555) 111-2222',
    lastLogin: new Date('2023-06-15T14:30:00'),
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-06-15'),
  },
  {
    id: 'user_2',
    email: 'jane.smith@acme.example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    isActive: true,
    phoneNumber: '+1 (555) 333-4444',
    lastLogin: new Date('2023-06-14T09:15:00'),
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-05-30'),
  },
  {
    id: 'user_3',
    email: 'michael.johnson@techsolutions.example.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    isActive: true,
    phoneNumber: '+1 (555) 555-6666',
    lastLogin: new Date('2023-06-10T16:45:00'),
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-06-10'),
  },
];

const mockOrgUsers = [
  { organizationId: 'org_1', userId: 'user_1', role: 'admin', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { organizationId: 'org_1', userId: 'user_2', role: 'purchaser', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { organizationId: 'org_2', userId: 'user_3', role: 'admin', status: 'active', createdAt: new Date(), updatedAt: new Date() },
];

const mockCategories: ProductCategory[] = [
  {
    id: 'cat_1',
    name: 'Electronics',
    slug: 'electronics',
    position: 1,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: 'cat_2',
    name: 'Office Supplies',
    slug: 'office-supplies',
    position: 2,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: 'cat_3',
    name: 'Industrial Equipment',
    slug: 'industrial-equipment',
    position: 3,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Enterprise Laptop X1',
    slug: 'enterprise-laptop-x1',
    description: 'High-performance laptop for business professionals.',
    shortDescription: 'Business laptop with 16GB RAM and 512GB SSD',
    sku: 'LAP-X1-001',
    isActive: true,
    hasVariants: true,
    categories: ['cat_1'],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-05-15'),
  },
  {
    id: 'prod_2',
    name: 'Office Desk Pro',
    slug: 'office-desk-pro',
    description: 'Adjustable height desk suitable for any office environment.',
    shortDescription: 'Adjustable height professional desk',
    sku: 'DSK-PRO-001',
    isActive: true,
    hasVariants: true,
    categories: ['cat_2'],
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-04-20'),
  },
  {
    id: 'prod_3',
    name: 'Industrial Safety Helmet',
    slug: 'industrial-safety-helmet',
    description: 'High-impact resistant safety helmet for industrial use.',
    shortDescription: 'OSHA-approved safety helmet',
    sku: 'HLM-SAF-001',
    isActive: true,
    hasVariants: true,
    categories: ['cat_3'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-03-10'),
  },
];

const mockVariants: ProductVariant[] = [
  {
    id: 'var_1',
    productId: 'prod_1',
    sku: 'LAP-X1-001-BLK',
    name: 'Enterprise Laptop X1 - Black',
    position: 1,
    isDefault: true,
    isActive: true,
    optionValues: [
      { optionId: 'opt_1', value: 'Black' },
      { optionId: 'opt_2', value: '16GB' },
      { optionId: 'opt_3', value: '512GB' }
    ],
    price: 1299.99,
    costPrice: 950,
    inventoryQuantity: 45,
    backorderable: true,
    imageUrls: ['/placeholder.svg'],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-05-15'),
  },
  {
    id: 'var_2',
    productId: 'prod_1',
    sku: 'LAP-X1-001-SLV',
    name: 'Enterprise Laptop X1 - Silver',
    position: 2,
    isDefault: false,
    isActive: true,
    optionValues: [
      { optionId: 'opt_1', value: 'Silver' },
      { optionId: 'opt_2', value: '16GB' },
      { optionId: 'opt_3', value: '512GB' }
    ],
    price: 1299.99,
    costPrice: 950,
    inventoryQuantity: 38,
    backorderable: true,
    imageUrls: ['/placeholder.svg'],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-05-15'),
  },
];

const mockOrders: Order[] = [
  {
    id: 'order_1',
    orderNumber: 'ORD-12345',
    organizationId: 'org_1',
    userId: 'user_1',
    orderDate: new Date('2023-06-01'),
    status: 'processing',
    shippingAddressId: 'addr_1',
    billingAddressId: 'addr_2',
    shippingMethod: 'express',
    shippingAmount: 15.99,
    taxAmount: 119.99,
    subtotal: 1499.99,
    total: 1635.97,
    currencyCode: 'USD',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    requiresApproval: false,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-02'),
  },
  {
    id: 'order_2',
    orderNumber: 'ORD-12346',
    organizationId: 'org_2',
    userId: 'user_3',
    orderDate: new Date('2023-06-05'),
    status: 'pending_approval',
    shippingAddressId: 'addr_3',
    billingAddressId: 'addr_3',
    taxAmount: 24.00,
    subtotal: 299.99,
    total: 323.99,
    currencyCode: 'USD',
    poNumber: 'PO-9876',
    paymentStatus: 'pending',
    paymentMethod: 'purchase_order',
    requiresApproval: true,
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-06-05'),
  },
];

const mockCarts: Cart[] = [
  {
    id: 'cart_1',
    userId: 'user_1',
    organizationId: 'org_1',
    currencyCode: 'USD',
    isActive: true,
    subtotal: 2599.98,
    total: 2825.97,
    taxAmount: 207.99,
    shippingAmount: 18.00,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-15'),
  }
];

const mockSavedLists: SavedList[] = [
  {
    id: 'list_1',
    name: 'IT Department Favorites',
    organizationId: 'org_1',
    userId: 'user_1',
    type: 'favorites',
    isPublic: true,
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-05-20'),
  },
  {
    id: 'list_2',
    name: 'Monthly Office Supplies',
    organizationId: 'org_1',
    userId: 'user_1',
    type: 'regular_order',
    isPublic: true,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-06-01'),
  }
];

const mockRfqs: RequestForQuote[] = [
  {
    id: 'rfq_1',
    rfqNumber: 'RFQ-5001',
    organizationId: 'org_1',
    userId: 'user_1',
    status: 'submitted',
    notes: 'Requesting bulk pricing for company-wide laptop refresh',
    expirationDate: new Date('2023-07-15'),
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01'),
  },
  {
    id: 'rfq_2',
    rfqNumber: 'RFQ-5002',
    organizationId: 'org_2',
    userId: 'user_3',
    status: 'in_review',
    notes: 'Office furniture for new branch location',
    expirationDate: new Date('2023-07-10'),
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-06-07'),
  }
];
