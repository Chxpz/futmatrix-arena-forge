import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: async () => {
      const response = await apiClient.getCurrentUser();
      return response.profile;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

export const useUserStats = (userId: string) => {
  return useQuery({
    queryKey: ['user', 'stats', userId],
    queryFn: async () => {
      const response = await apiClient.getUserStats();
      return response.stats;
    },
    enabled: !!userId,
  });
};

export const useUserMatches = (userId: string, limit = 10) => {
  return useQuery({
    queryKey: ['matches', userId, limit],
    queryFn: async () => {
      const response = await apiClient.getUserMatches(limit);
      return response.matches;
    },
    enabled: !!userId,
  });
};

export const useUserTrainingPlans = (userId: string) => {
  return useQuery({
    queryKey: ['training', userId],
    queryFn: async () => {
      const response = await apiClient.getUserTrainingPlans();
      return response.plans;
    },
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: any) => {
      const response = await apiClient.updateUserProfile(updates);
      return response.profile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'current'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (matchData: any) => {
      const response = await apiClient.createMatch(matchData);
      return response.match;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
    },
  });
};