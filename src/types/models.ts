
/**
 * B2B Commerce Nexus - Core Data Models
 * 
 * This file defines the core data models for the B2B Commerce Nexus platform.
 * These types represent the domain entities in our system and mirror
 * the database schema design.
 */

// Base entity interface with common fields
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== ORGANIZATION MODELS ====================

export interface Organization extends BaseEntity {
  name: string;
  code: string;
  taxId?: string;
  website?: string;
  phoneNumber?: string;
  status: 'active' | 'pending' | 'suspended';
  billingAddressId?: string;
  shippingAddressId?: string;
  primaryContactId?: string;
  priceTierId?: string;
  creditLimit?: number;
  paymentTerms?: string; // e.g., "net30", "net60"
  defaultPaymentMethod?: string;
  customFields?: Record<string, any>;
}

export interface OrganizationUser extends BaseEntity {
  organizationId: string;
  userId: string;
  role: OrganizationUserRole;
  status: 'active' | 'pending' | 'suspended';
  department?: string;
  jobTitle?: string;
  purchaseLimit?: number;
  requiresApproval?: boolean;
}

export type OrganizationUserRole = 
  | 'admin'        // Can manage organization settings and users
  | 'purchaser'    // Can place orders
  | 'approver'     // Can approve orders
  | 'viewer';      // Can only view catalog and orders

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash?: string;
  phoneNumber?: string;
  isActive: boolean;
  lastLogin?: Date;
  isSalesRep?: boolean;
}

export interface Address extends BaseEntity {
  name?: string; // e.g., "Headquarters", "Warehouse"
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault?: boolean;
  addressType: 'billing' | 'shipping' | 'both';
}

// ==================== PRODUCT MODELS ====================

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku?: string;
  isActive: boolean;
  hasVariants: boolean;
  metaTitle?: string;
  metaDescription?: string;
  taxCategoryId?: string;
  brandId?: string;
  attributes?: Record<string, any>;
  categories?: string[]; // Category IDs
  images?: string[]; // Added images property to store image URLs
}

export interface ProductVariant extends BaseEntity {
  productId: string;
  sku: string;
  name?: string;
  position: number;
  isDefault: boolean;
  isActive: boolean;
  optionValues: ProductOptionValue[];
  price: number;
  costPrice?: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: string;
  dimensions?: ProductDimensions;
  inventoryQuantity: number;
  backorderable: boolean;
  minOrderQuantity?: number;
  incrementalOrderQuantity?: number;
  imageUrls?: string[];
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
  unit?: string; // e.g., "cm", "in"
}

export interface ProductOption extends BaseEntity {
  productId: string;
  name: string;
  position: number;
  values: string[];
}

export interface ProductOptionValue {
  optionId: string;
  value: string;
}

export interface ProductCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  position: number;
  isActive: boolean;
  imageUrl?: string;
}

export interface PriceTier extends BaseEntity {
  name: string;
  code: string;
  description?: string;
}

export interface ProductPrice extends BaseEntity {
  productVariantId: string;
  priceTierId: string;
  price: number;
  minQuantity?: number;
  maxQuantity?: number;
  currencyCode: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

// ==================== ORDER MODELS ====================

export interface Order extends BaseEntity {
  orderNumber: string;
  organizationId: string;
  userId: string;
  orderDate: Date;
  status: OrderStatus;
  shippingAddressId: string;
  billingAddressId: string;
  shippingMethod?: string;
  shippingAmount?: number;
  taxAmount?: number;
  subtotal: number;
  total: number;
  discountAmount?: number;
  currencyCode: string;
  notes?: string;
  poNumber?: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  estimatedDeliveryDate?: Date;
  customFields?: Record<string, any>;
}

export type OrderStatus = 
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'processing'
  | 'on_hold'
  | 'shipped'
  | 'delivered'
  | 'canceled'
  | 'returned';

export type PaymentStatus = 
  | 'pending'
  | 'authorized'
  | 'paid'
  | 'partially_paid'
  | 'refunded'
  | 'partially_refunded'
  | 'voided';

export interface OrderLine extends BaseEntity {
  orderId: string;
  productVariantId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxAmount?: number;
  discountAmount?: number;
  notes?: string;
  customFields?: Record<string, any>;
  fulfillmentStatus?: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled';
}

export interface RequestForQuote extends BaseEntity {
  rfqNumber: string;
  organizationId: string;
  userId: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'expired';
  expirationDate?: Date;
  notes?: string;
  shippingAddressId?: string;
  customFields?: Record<string, any>;
}

export interface RfqItem extends BaseEntity {
  rfqId: string;
  productVariantId: string;
  quantity: number;
  requestedPrice?: number;
  approvedPrice?: number;
  notes?: string;
}

// ==================== CART MODELS ====================

export interface Cart extends BaseEntity {
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  currencyCode: string;
  isActive: boolean;
  abandonedAt?: Date;
  subtotal: number;
  total: number;
  shippingAmount?: number;
  taxAmount?: number;
  discountAmount?: number;
  poNumber?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
  notes?: string;
}

export interface CartItem extends BaseEntity {
  cartId: string;
  productVariantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

// ==================== MISC MODELS ====================

export interface QuickOrder {
  items: QuickOrderItem[];
  organizationId: string;
  userId: string;
}

export interface QuickOrderItem {
  sku: string;
  quantity: number;
}

export interface SavedList extends BaseEntity {
  name: string;
  organizationId: string;
  userId: string;
  type: 'favorites' | 'requisition' | 'regular_order'; 
  isPublic: boolean; // Visible to other org members if true
}

export interface SavedListItem extends BaseEntity {
  savedListId: string;
  productVariantId: string;
  quantity: number;
  addedAt: Date;
}

// API response wrappers
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
  details?: Record<string, any>;
}
