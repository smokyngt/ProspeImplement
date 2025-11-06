import { create } from 'zustand';
import { prosperify } from '@/core/ProsperifyClient';
import useAuthStore from '@/features/auth/store/AuthStore';
import type { AssistantSummary } from '@/features/assistant/types';

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

      const token = useAuthStore.getState().token;
      if (!token) throw new Error('Not authenticated');

      const response = await prosperify.assistants.postV1AssistantsList(); // ✅ updated: direct SDK call
      const assistants = (response.data?.assistants ?? []) as AssistantSummary[];

      set({ assistants, isLoading: false });
    } catch (error: any) {
      const errorMessage = error?.body?.message || error.message || 'Failed to fetch assistants';
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAssistantStore;
