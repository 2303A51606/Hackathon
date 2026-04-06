import { Subscription, PaymentHistory, SpendingData, CategorySpend } from './types';

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Entertainment',
    price: 15.99,
    billingCycle: 'monthly',
    nextBillingDate: '2023-10-15',
    status: 'active',
    icon: 'Tv',
    color: '#E50914',
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'Entertainment',
    price: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2023-10-18',
    status: 'active',
    icon: 'Music',
    color: '#1DB954',
  },
  {
    id: '3',
    name: 'Amazon Prime',
    category: 'Utilities',
    price: 14.99,
    billingCycle: 'monthly',
    nextBillingDate: '2023-10-25',
    status: 'active',
    icon: 'ShoppingBag',
    color: '#FF9900',
  },
  {
    id: '4',
    name: 'Gym Membership',
    category: 'Fitness',
    price: 50.00,
    billingCycle: 'monthly',
    nextBillingDate: '2023-11-02',
    status: 'active',
    icon: 'Dumbbell',
    color: '#1a237e',
  },
  {
    id: '5',
    name: 'Skillshare',
    category: 'Education',
    price: 15.00,
    billingCycle: 'monthly',
    nextBillingDate: '2023-11-10',
    status: 'active',
    icon: 'GraduationCap',
    color: '#002333',
    usageHours: 0,
  },
  {
    id: '6',
    name: 'Peloton',
    category: 'Fitness',
    price: 44.00,
    billingCycle: 'monthly',
    nextBillingDate: '2023-11-15',
    status: 'active',
    icon: 'Bike',
    color: '#df1c24',
    usageHours: 1,
  },
];

export const MOCK_PAYMENT_HISTORY: PaymentHistory[] = [
  { id: 'h1', date: 'Sept 15', amount: 15.99, status: 'success', method: 'Visa •••• 4242' },
  { id: 'h2', date: 'Aug 15', amount: 15.99, status: 'success', method: 'Visa •••• 4242' },
  { id: 'h3', date: 'July 15', amount: 15.99, status: 'success', method: 'Visa •••• 4242' },
];

export const MOCK_SPENDING_TREND: SpendingData[] = [
  { month: 'MAR', amount: 180 },
  { month: 'APR', amount: 210 },
  { month: 'MAY', amount: 160 },
  { month: 'JUN', amount: 240 },
  { month: 'JUL', amount: 260 },
  { month: 'AUG', amount: 240 },
];

export const MOCK_CATEGORY_SPEND: CategorySpend[] = [
  { name: 'Entertainment', value: 45, color: '#000666' },
  { name: 'Fitness', value: 25, color: '#006a6a' },
  { name: 'Productivity', value: 15, color: '#76d6d5' },
  { name: 'Others', value: 15, color: '#c6c5d4' },
];
