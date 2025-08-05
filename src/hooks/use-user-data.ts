import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, matchService, trainingService } from '@/services/api';
import type { User, UserStatsummary, Match, TrainingPlan } from '@/types/database';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: userService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserStats = (userId: string) => {
  return useQuery({
    queryKey: ['user', 'stats', userId],
    queryFn: () => userService.getUserStats(userId),
    enabled: !!userId,
  });
};

export const useUserMatches = (userId: string, limit = 10) => {
  return useQuery({
    queryKey: ['matches', userId, limit],
    queryFn: () => matchService.getUserMatches(userId, limit),
    enabled: !!userId,
  });
};

export const useUserTrainingPlans = (userId: string) => {
  return useQuery({
    queryKey: ['training', userId],
    queryFn: () => trainingService.getUserTrainingPlans(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<User> }) =>
      userService.updateUser(userId, updates),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'current'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (match: Omit<Match, 'id' | 'timestamp'>) =>
      matchService.createMatch(match),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
    },
  });
};