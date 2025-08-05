export interface WhopAuthResponse {
  user: {
    id: string;
    email: string;
    username?: string;
  };
  token: string;
  memberships: Array<{
    id: string;
    plan_id: string;
    status: string;
    expires_at?: string;
  }>;
}

class WhopAuthService {
  private clientId: string = 'app_dL08bPo6FsVXvA';
  private clientSecret: string = '';

  initialize(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  getAuthUrl(redirectUri: string): string {
    if (!this.clientId) {
      throw new Error('Whop client not initialized');
    }

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'user:read memberships:read',
    });

    return `https://whop.com/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string, redirectUri: string): Promise<WhopAuthResponse> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Whop client not initialized');
    }

    try {
      const response = await fetch('https://api.whop.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await response.json();
      
      // Get user info with the access token
      const userResponse = await fetch('https://api.whop.com/api/v2/me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to get user info');
      }

      const userData = await userResponse.json();

      // Get memberships
      const membershipsResponse = await fetch('https://api.whop.com/api/v2/me/memberships', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      });

      let memberships = [];
      if (membershipsResponse.ok) {
        const membershipsData = await membershipsResponse.json();
        memberships = membershipsData.data || [];
      }

      return {
        user: {
          id: userData.id,
          email: userData.email,
          username: userData.username,
        },
        token: tokenData.access_token,
        memberships,
      };
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<WhopAuthResponse> {
    try {
      const userResponse = await fetch('https://api.whop.com/api/v2/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Invalid token');
      }

      const userData = await userResponse.json();

      // Get memberships
      const membershipsResponse = await fetch('https://api.whop.com/api/v2/me/memberships', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      let memberships = [];
      if (membershipsResponse.ok) {
        const membershipsData = await membershipsResponse.json();
        memberships = membershipsData.data || [];
      }

      return {
        user: {
          id: userData.id,
          email: userData.email,
          username: userData.username,
        },
        token,
        memberships,
      };
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }
}

export const whopAuth = new WhopAuthService();