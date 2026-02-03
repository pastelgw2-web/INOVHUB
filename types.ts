
export type Category = 'Technology' | 'Social' | 'Environment' | 'Education' | 'Health';

export interface User {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  role: 'Innovator' | 'Volunteer' | 'Admin';
}

export interface SkillSlot {
  id: string;
  title: string;
  capacity: number;
  filled: number;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: Category;
  creatorId: string;
  goalAmount: number;
  currentAmount: number;
  image: string;
  skillSlots: SkillSlot[];
  status: 'Draft' | 'Active' | 'Completed';
  createdAt: string;
}

export interface Donation {
  id: string;
  projectId: string;
  donorName: string;
  amount: number;
  date: string;
}

export interface VolunteerApplication {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  skill: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedAt: string;
}
