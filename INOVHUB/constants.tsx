
import React from 'react';
import { Project, User, Category } from './types';
import { 
  Lightbulb, 
  HandCoins, 
  Users, 
  LayoutDashboard, 
  Settings, 
  Search,
  Target,
  Rocket,
  ShieldCheck
} from 'lucide-react';

export const CATEGORIES: Category[] = ['Technology', 'Social', 'Environment', 'Education', 'Health'];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Eco-Filter Water Purifier',
    tagline: 'Affordable, low-maintenance water filters for rural areas.',
    description: 'Developed using local materials to provide clean water to off-grid communities.',
    category: 'Environment',
    creatorId: 'u1',
    goalAmount: 50000000,
    currentAmount: 32500000,
    image: 'https://picsum.photos/seed/water/800/600',
    skillSlots: [
      { id: 's1', title: 'Mechanical Engineer', capacity: 2, filled: 1 },
      { id: 's2', title: 'Community Coordinator', capacity: 3, filled: 0 }
    ],
    status: 'Active',
    createdAt: '2024-01-15'
  },
  {
    id: 'p2',
    title: 'Edu-VR Classroom',
    tagline: 'Bringing world-class education to remote villages through VR.',
    description: 'An interactive virtual classroom solution designed for low-bandwidth environments.',
    category: 'Education',
    creatorId: 'u2',
    goalAmount: 120000000,
    currentAmount: 85000000,
    image: 'https://picsum.photos/seed/vr/800/600',
    skillSlots: [
      { id: 's3', title: 'Unity Developer', capacity: 1, filled: 1 },
      { id: 's4', title: 'UI/UX Designer', capacity: 2, filled: 1 }
    ],
    status: 'Active',
    createdAt: '2024-02-10'
  }
];

export const NAV_ITEMS = [
  { name: 'Browse Innovations', icon: <Search className="w-5 h-5" />, path: '/' },
  { name: 'My Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
  { name: 'Post Idea', icon: <Lightbulb className="w-5 h-5" />, path: '/post' },
  { name: 'Admin Panel', icon: <ShieldCheck className="w-5 h-5" />, path: '/admin' }
];
