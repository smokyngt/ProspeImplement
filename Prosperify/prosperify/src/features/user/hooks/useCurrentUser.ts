import { useQuery } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';

/**
 * ✅ Récupère l'utilisateur actuellement connecté depuis le localStorage
 */
export function useCurrentUser() {
  const getCurrentUserId = (): string | null => {
    const userDataStr = localStorage.getItem('current_user');
    if (!userDataStr) return null;
    try {
      const userData = JSON.parse(userDataStr);
      return userData.id ?? null;
    } catch {
      return null;
    }
  };

  const userId = getCurrentUserId();

  return useQuery({
    queryKey: ['current-user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID found');

      // ✅ Cast explicite pour corriger le typage OpenAPI
      const res = await prosperify.users.getV1Users(userId) as {
        data?: {
          user?: {
            [x: string]: any;

            id: string;
            name: string;
            email: string;
            organization?: string | null;
            verified: boolean;
            roles: string[];
            preferences?: { language?: 'en' | 'fr'; theme?: 'light' | 'dark' };
          };
        };
      };

      if (!res?.data?.user) throw new Error('User not found in API response');
      return res.data.user;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
