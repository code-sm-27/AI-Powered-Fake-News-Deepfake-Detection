export interface Article {
  id: string;
  title: string;
  url: string;
  credibilityScore: number;
  flags: number;
  verifications: number;
  status: 'verified' | 'disputed' | 'unverified';
  dateSubmitted: string;
  submittedBy: string;
}

export interface User {
  id: string;
  name: string;
  trustScore: number;
  verifications: number;
  role: 'user' | 'moderator' | 'admin';
}