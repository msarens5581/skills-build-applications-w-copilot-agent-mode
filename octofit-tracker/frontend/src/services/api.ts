/**
 * API Configuration for OctoFit Tracker
 * 
 * IMPORTANT: Set VITE_CODESPACE_NAME in .env.local for Codespaces support:
 *   VITE_CODESPACE_NAME=your-codespace-name
 * 
 * If not set, the app will fall back to localhost:8000
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  // Fallback: use localhost if VITE_CODESPACE_NAME is not set
  if (!codespaceName || codespaceName === 'undefined') {
    return 'http://localhost:8000';
  }

  return `https://${codespaceName}-8000.app.github.dev`;
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

export interface LeaderboardEntry {
  _id: string;
  team: Team | { _id: string; name: string; description: string };
  rank: number;
  points: number;
  updatedAt: string;
}

export interface Workout {
  _id: string;
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const apiClient = {
  async getUsers() {
    const response = await fetch(`${getApiBaseUrl()}/api/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.users || data;
  },

  async getActivities() {
    const response = await fetch(`${getApiBaseUrl()}/api/activities`);
    if (!response.ok) throw new Error('Failed to fetch activities');
    const data = await response.json();
    return data.activities || data;
  },

  async getTeams() {
    const response = await fetch(`${getApiBaseUrl()}/api/teams`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    const data = await response.json();
    return data.teams || data;
  },

  async getLeaderboard() {
    const response = await fetch(`${getApiBaseUrl()}/api/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    const data = await response.json();
    return data.leaderboard || data;
  },

  async getWorkouts() {
    const response = await fetch(`${getApiBaseUrl()}/api/workouts`);
    if (!response.ok) throw new Error('Failed to fetch workouts');
    const data = await response.json();
    return data.workouts || data;
  }
};

