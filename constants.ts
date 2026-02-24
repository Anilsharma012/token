
import { Job, Category, Talent } from './types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'sales',
    name: 'Sales / Marketing',
    icon: 'trending_up',
    jobsCount: '450+',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'driver',
    name: 'Driver / Logistics',
    icon: 'local_shipping',
    jobsCount: '320+',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-192d992a605b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'accounting',
    name: 'Accounts / Finance',
    icon: 'payments',
    jobsCount: '210+',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tech',
    name: 'IT / Software',
    icon: 'terminal',
    jobsCount: '180+',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Sales Executive and Team Lead',
    company: 'Confidential Company',
    location: 'Mumbai, India',
    salary: '₹15,000 - ₹25,000',
    type: 'Full Time',
    experience: '1-2 Years',
    education: 'Bachelor\'s Degree',
    postedAt: '2 days ago',
    category: 'sales',
    isFeatured: true,
    description: 'We are looking for a competitive and trustworthy Sales Executive to help us build up our business activities. You will be responsible for discovering and pursuing new sales prospects, negotiating deals and maintaining customer satisfaction.',
    responsibilities: [
      'Conduct market research to identify selling possibilities',
      'Actively seek out new sales opportunities',
      'Set up meetings with potential clients',
      'Prepare and deliver appropriate presentations'
    ],
    requirements: [
      'Proven experience as a Sales Executive',
      'Proficiency in English',
      'Excellent knowledge of MS Office',
      'Thorough understanding of marketing techniques'
    ],
    // Fix: Adding required workMode property
    workMode: 'Onsite'
  },
  {
    id: '2',
    title: 'Senior Accountant',
    company: 'Flamingo Furniture Factory',
    location: 'Ajman Industrial, Ajman',
    salary: 'AED 4,000 - 6,000',
    type: 'Full Time',
    experience: '3-5 Years',
    education: 'High-School / Secondary',
    postedAt: 'Yesterday',
    category: 'accounting',
    isFeatured: true,
    description: 'Seeking a detail-oriented Accountant to manage daily financial transactions and ledger reconciliation.',
    responsibilities: ['Journal entries', 'Bank reconciliation', 'VAT filing'],
    requirements: ['Commerce background', 'Tally proficiency', 'Experience in manufacturing preferred'],
    // Fix: Adding required workMode property
    workMode: 'Onsite'
  },
  {
    id: '3',
    title: 'Company Finance Assistant',
    company: 'SKY SUNRISE ELECTRONICS TRADING L....',
    location: 'Dubai Investment Park (DIP), Dubai',
    salary: 'AED 2,000 - 3,999',
    type: 'Full Time',
    experience: '1-2 Years',
    education: 'High-School / Secondary',
    postedAt: 'Yesterday',
    category: 'accounting',
    isFeatured: true,
    description: 'Assist the finance manager in daily bookkeeping and inventory tracking.',
    responsibilities: ['Invoicing', 'Payment tracking', 'Inventory support'],
    requirements: ['Basic accounting knowledge', 'Excel skills', 'Fluent in English'],
    // Fix: Adding required workMode property
    workMode: 'Hybrid'
  }
];

export const MOCK_TALENTS: Talent[] = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    role: 'Senior Sales Consultant',
    location: 'Dubai, UAE',
    expectedSalary: 'AED 8,000 - 10,000',
    experience: '5+ Years',
    education: 'MBA Marketing',
    skills: ['Direct Sales', 'CRM', 'B2B', 'Negotiation'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    availability: 'Immediate',
    bio: 'Highly motivated sales professional with 5 years of experience in the UAE real estate and retail market.',
    // Fix: Adding required profileCompletion property
    profileCompletion: 85
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Financial Analyst',
    location: 'Abu Dhabi, UAE',
    expectedSalary: 'AED 12,000+',
    experience: '3 Years',
    education: 'CPA / Bachelor of Commerce',
    skills: ['Financial Modeling', 'Audit', 'Taxation'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    availability: '1 Month Notice',
    bio: 'Experienced accountant looking for a challenging role in a multinational corporation.',
    // Fix: Adding required profileCompletion property
    profileCompletion: 92
  }
];
