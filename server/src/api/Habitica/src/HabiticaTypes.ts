// habiticaTypes.ts

export interface ChallengeLeader {
  _id: string;
  profile: {
    name: string;
  };
}

export interface Challenge {
  _id: string;
  type: string;
  privacy: string;
  name: string;
  shortName: string;
  leader: ChallengeLeader;
  updatedAt: string;
  createdAt: string;
  id: string;
  prize: string;
  memberCount: string;
  tasksOrder: {
    rewards: string[];
    todos: string[];
    dailys: string[];
    habits: string[];
  };
  official: boolean;
}
export interface Task {
    id: string;          // Task ID
    text: string;        // Task title
    type: string;        // Task type (e.g., "todo", "daily", "habit")
    completed?: boolean; // Optional: Task completion status
}

export interface CreateChallengeResponse {
  data: {
    group: {
      _id: string;
      name: string;
      type: string;
      privacy: string;
    };
    name: string;
    shortName: string;
    leader: ChallengeLeader;
    updatedAt: string;
    createdAt: string;
    _id: string;
    prize: string;
    memberCount: string;
    tasksOrder: {
      rewards: string[];
      todos: string[];
      dailys: string[];
      habits: string[];
    };
    official: boolean;
    id: string;
  };
}
