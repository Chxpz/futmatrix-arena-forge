// API client for backend communication
const API_BASE_URL = 'https://qwwahtsehozxbjzeiajt.supabase.co/functions/v1';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    
    // Try to get token from localStorage on initialization
    const storedToken = localStorage.getItem('whop_token');
    if (storedToken) {
      this.token = storedToken;
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('whop_token', token);
    } else {
      localStorage.removeItem('whop_token');
    }
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
  async exchangeWhopCode(code: string, redirectUri: string) {
    return this.request('/auth/whop-exchange', {
      method: 'POST',
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    });
  }

  async verifyWhopToken(token: string) {
    return this.request('/auth/whop-verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async signOut() {
    this.setToken(null);
    return { success: true };
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