import { useQuery } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';

/**
 * ✅ Récupère l'utilisateur actuellement connecté depuis le localStorage
 */
export function useCurrentUser() {
  // Récupère l'ID depuis le localStorage (supposé être sauvegardé après login)
  const getCurrentUserId = (): string | null => {
    const userDataStr = localStorage.getItem('current_user');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.id || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const userId = getCurrentUserId();

  return useQuery({
    queryKey: ['current-user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No user ID found');
      const res = await prosperify.users.getV1Users(userId);
      return res?.data?.user || null;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}