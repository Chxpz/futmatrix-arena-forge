// API client for backend communication
const API_BASE_URL = 'https://qwwahtsehozxbjzeiajt.supabase.co/functions/v1';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signUp(email: string, password: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signIn(email: string, password: string) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signOut() {
    return this.request('/auth/signout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/user');
  }

  // User data endpoints
  async getUserStats() {
    return this.request('/user-data/stats');
  }

  async getUserMatches(limit: number = 10) {
    return this.request(`/user-data/matches?limit=${limit}`);
  }

  async getUserTrainingPlans() {
    return this.request('/user-data/training-plans');
  }

  async getUserProfile() {
    return this.request('/user-data/profile');
  }

  async updateUserProfile(updates: any) {
    return this.request('/user-data/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async createMatch(matchData: any) {
    return this.request('/user-data/matches', {
      method: 'POST',
      body: JSON.stringify(matchData),
    });
  }

  async createTrainingPlan(planData: any) {
    return this.request('/user-data/training-plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }
}

export const apiClient = new ApiClient();