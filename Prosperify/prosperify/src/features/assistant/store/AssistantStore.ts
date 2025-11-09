import { create } from 'zustand';
import { prosperify } from '@/core/ProsperifyClient';
import { useAuthStore } from '@/features/auth/store/AuthStore';
import type { AssistantSummary } from '@/features/assistant/types/assistantTypes';

// ✅ Type pour la réponse de l'API assistants/list
interface AssistantsListResponse {
  assistants: AssistantSummary[];
  total?: number;
  hasMore?: boolean;
  page?: number;
}

interface AssistantState {
  assistants: AssistantSummary[];
  isLoading: boolean;
  error: string | null;

  fetchAssistants: () => Promise<void>;
  clearError: () => void;
}

const useAssistantStore = create<AssistantState>((set) => ({
  assistants: [],
  isLoading: false,
  error: null,

  fetchAssistants: async () => {
    try {
      set({ isLoading: true, error: null });

      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error('Not authenticated');

      // ✅ Appel SDK direct
      const response = await prosperify.assistants.postV1AssistantsList({
        limit: 100,
        order: 'desc',
        page: 1,
      });

      // ✅ Extraction type-safe avec assertion
      const data = response?.data as unknown as AssistantsListResponse;
      const assistants = Array.isArray(data?.assistants) ? data.assistants : [];

      set({ assistants, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error?.body?.message ||
        error?.message ||
        'Failed to fetch assistants';
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAssistantStore;