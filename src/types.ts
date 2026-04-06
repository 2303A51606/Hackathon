export type SubscriptionStatus = 'active' | 'paused' | 'inactive';

export interface Subscription {
  id: string;
  name: string;
  category: string;
  price: number;
  billingCycle: 'monthly' | 'annual';
  nextBillingDate: string;
  status: SubscriptionStatus;
  icon: string;
  color: string;
  usageHours?: number;
  lastUsed?: string;
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  method: string;
}

export interface SpendingData {
  month: string;
  amount: number;
}

export interface CategorySpend {
  name: string;
  value: number;
  color: string;
}
