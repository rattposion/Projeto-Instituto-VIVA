export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar?: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  members: Member[];
  pixels: Pixel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  userId: string;
  workspaceId: string;
  role: 'admin' | 'manager' | 'viewer';
  user: User;
  createdAt: Date;
}

export interface Pixel {
  id: string;
  name: string;
  pixelId: string;
  status: 'active' | 'inactive' | 'error';
  metaAccount: string;
  workspaceId: string;
  lastActivity?: Date;
  eventsCount: number;
  conversionsCount: number;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  pixelId: string;
  eventName: string;
  eventType: 'standard' | 'custom';
  parameters: Record<string, any>;
  source: 'web' | 'server' | 'mobile';
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
  processed: boolean;
  error?: string;
}

export interface CustomConversion {
  id: string;
  name: string;
  pixelId: string;
  rules: ConversionRule[];
  funnelSteps: FunnelStep[];
  conversionRate: number;
  totalValue: number;
  isActive: boolean;
  createdAt: Date;
}

export interface ConversionRule {
  type: 'url' | 'event';
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with';
  value: string;
}

export interface FunnelStep {
  order: number;
  eventName: string;
  description: string;
  count: number;
}

export interface CAPIConfig {
  id: string;
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
  isActive: boolean;
  lastSync?: Date;
  errorCount: number;
}

export interface PixelLog {
  id: string;
  pixelId: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  data?: Record<string, any>;
  timestamp: Date;
}

export interface Alert {
  id: string;
  workspaceId: string;
  type: 'pixel_inactive' | 'event_failure' | 'conversion_drop';
  title: string;
  description: string;
  isActive: boolean;
  conditions: AlertCondition[];
  notifications: NotificationChannel[];
  lastTriggered?: Date;
}

export interface AlertCondition {
  metric: string;
  operator: 'greater_than' | 'less_than' | 'equals';
  value: number;
  timeframe: number; // minutes
}

export interface NotificationChannel {
  type: 'email' | 'webhook';
  target: string;
  isActive: boolean;
}

export interface EventTemplate {
  name: string;
  eventName: string;
  parameters: EventParameter[];
  description: string;
  category: 'ecommerce' | 'lead' | 'engagement' | 'custom';
}

export interface EventParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  required: boolean;
  description: string;
  defaultValue?: any;
}

export interface Integration {
  id: string;
  type: 'gtm' | 'wordpress' | 'shopify' | 'webhook';
  name: string;
  config: Record<string, any>;
  isActive: boolean;
  lastSync?: Date;
}

export interface DashboardStats {
  totalEvents: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  activePixels: number;
  eventsToday: number;
  revenueToday: number;
  topEvents: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}