export interface MiniProgramCard {
  id: string;
  title: string;
  subtitle: string;
  actionText: string;
  targetPage: string;
  image: string;
  tag?: string;
  color?: string;
}

export interface MBTIProfile {
  type: string;
  archetype: string;
  tagline: string;
  matchTypes: string[];
  description: string;
}

export interface BlindBoxSoulmate {
  id: string;
  name: string;
  mbti: string;
  avatar: string;
  age: number;
  city: string;
  vibe: string;
  matchScore: number;
  quote: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
  author: string;
  summary: string;
  likes: number;
}
