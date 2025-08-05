import { useState, useEffect } from 'react';
import { whopAuth, WhopAuthResponse } from '@/services/whop-auth';
import { apiClient } from '@/services/api-client';

export interface WhopUser {
  id: string;
  email: string;
  username?: string;
}

export interface WhopMembership {
  id: string;
  plan_id: string;
  status: string;
  expires_at?: string;
}

export const useWhopAuth = () => {
  const [user, setUser] = useState<WhopUser | null>(null);
  const [memberships, setMemberships] = useState<WhopMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('whop_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiClient.verifyWhopToken(token);
      if (response.error) {
        localStorage.removeItem('whop_token');
        setError(response.error.message);
      } else {
        setUser(response.user);
        setMemberships(response.memberships || []);
        apiClient.setToken(response.token);
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('whop_token');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await apiClient.signOut();
      setUser(null);
      setMemberships([]);
      setError(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      // Clear local state even if API call fails
      localStorage.removeItem('whop_token');
      setUser(null);
      setMemberships([]);
    }
  };

  const hasActiveMembership = () => {
    return memberships.some(membership => membership.status === 'active');
  };

  const hasValidMembership = (planId?: string) => {
    if (!planId) {
      return hasActiveMembership();
    }
    return memberships.some(
      membership => membership.plan_id === planId && membership.status === 'active'
    );
  };

  return {
    user,
    memberships,
    loading,
    error,
    signOut,
    hasActiveMembership,
    hasValidMembership,
    checkAuthStatus,
  };
};