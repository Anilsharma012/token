
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  category: string;
  experience: string;
  education: string;
  isFeatured?: boolean;
  status?: 'active' | 'pending' | 'expired';
  description: string;
  responsibilities: string[];
  requirements: string[];
  workMode: 'Remote' | 'Onsite' | 'Hybrid';
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Viewed' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
  appliedDate: string;
}

export interface Talent {
  id: string;
  name: string;
  role: string;
  location: string;
  expectedSalary: string;
  experience: string;
  education: string;
  skills: string[];
  imageUrl: string;
  availability: string;
  bio: string;
  isVerified?: boolean;
  profileCompletion: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  jobsCount: string;
  imageUrl: string;
}

export enum AppScreen {
  SPLASH = 'splash',
  LOGIN = 'login',
  HOME = 'home',
  SEARCH = 'search',
  HIRE_SEARCH = 'hire_search',
  DETAILS = 'details',
  TALENT_DETAILS = 'talent_details',
  FAVORITES = 'favorites',
  CHATS = 'chats',
  MENU = 'menu',
  PROFILE = 'profile',
  TRACKER = 'tracker',
  RECRUITER_DASHBOARD = 'recruiter_dashboard',
  POST_JOB = 'post_job',
  ADMIN_LOGIN = 'admin_login',
  ADMIN = 'admin',
  AI_COACH = 'ai_coach',
  COMPANY_PROFILE = 'company_profile'
}

// Business & Monetization Types
export type PlanRole = 'EMPLOYER' | 'EMPLOYEE';
export type PlanStatus = 'Active' | 'Inactive';

export interface PricingPlan {
  id: string;
  role: PlanRole;
  name: string;
  durationDays: number;
  price: number;
  features: string[];
  credits: {
    jobPosts?: number;
    featuredJobs?: number;
    resumeUnlocks?: number;
    profileBoostDays?: number;
    premiumAlerts?: number;
  };
  status: PlanStatus;
  isRecommended: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  userName: string;
  role: PlanRole;
  planId: string;
  planName: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Paused' | 'Cancelled';
  creditsRemaining: any;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  planName: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Pending' | 'Refunded';
  method: string;
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  role: 'BOTH' | 'EMPLOYER' | 'EMPLOYEE';
  discountType: 'FLAT' | 'PERCENT';
  value: number;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
}

export interface AuditLogEntry {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}
