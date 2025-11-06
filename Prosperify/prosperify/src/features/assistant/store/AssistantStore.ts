import { create } from 'zustand';
import { prosperify } from '@/core/ProsperifyClient';
import useAuthStore from '@/features/auth/store/AuthStore';

export interface Assistant {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  object: 'assistant';
}

interface AssistantState {
  assistants: Assistant[];
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

      prosperify.setToken(token);

      // ✅ Adapter selon votre endpoint réel
      const res = await prosperify.assistants.postV1AssistantsList();
      const assistants = res.data?.assistants || [];

      set({ assistants, isLoading: false });
    } catch (error: any) {
      const errorMessage = error?.body?.message || error.message || 'Failed to fetch assistants';
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAssistantStore;