export interface Club {
  id?: string;
  name: string;
  description: string;
  category: string;
  school: string;
  grade: string;
  activities: string;
  tags: string[];
  memberCount: number;
  meetingTime: string;
  meetingPlace: string;
  achievements: string;
  isActive: boolean;
}
