export interface BaseEntity {
  id: number;
  createdAt: string; 
  updatedAt: string; 
}

/** User Type */
export interface SelectUser extends BaseEntity {
  username: string;
  email: string;
}

export interface InsertUser {
  username: string;
  email: string;
  password: string;
}

/** Habit Type */
export interface Habit extends BaseEntity {
  userId: number;
  name: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number; 
}


export interface HabitEntry extends BaseEntity {
  userId: number;
  habitId: number;
  dateCompleted: string; 
  progress: number; 
}
