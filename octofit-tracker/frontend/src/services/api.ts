const getApiBaseUrl = (): string => {
  const codespaceName = process.env.VITE_CODESPACE_NAME || window.location.hostname?.split('-')[0];
  
  if (codespaceName && codespaceName !== 'localhost') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

export interface Activity {
  _id: string;
  user: User | { _id: string; name: string; email: string; role: string };
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  recordedAt: string;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
}

export const apiClient = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${getApiBaseUrl()}/api/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.users;
  },

  async getActivities(): Promise<Activity[]> {
    const response = await fetch(`${getApiBaseUrl()}/api/activities`);
    if (!response.ok) throw new Error('Failed to fetch activities');
    const data = await response.json();
    return data.activities;
  },

  async getTeams(): Promise<Team[]> {
    const response = await fetch(`${getApiBaseUrl()}/api/teams`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    const data = await response.json();
    return data.teams;
  }
};
