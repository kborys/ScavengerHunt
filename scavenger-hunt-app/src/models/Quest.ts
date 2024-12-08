import { Waypoint } from './Waypoint';

export interface Quest {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // w minutach
  waypoints: Waypoint[];
  isActive: boolean;
  isCompleted: boolean;
  createdAt: Date;
} 