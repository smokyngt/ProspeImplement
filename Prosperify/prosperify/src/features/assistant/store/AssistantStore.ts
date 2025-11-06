import { create } from 'zustand';
import { ProsperifyClient } from '@/core/ProsperifyClient';
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

      const client = new ProsperifyClient({
        baseUrl: import.meta.env['VITE_API_BASE_URL'],
        token,
      });

      // ✅ Adapter selon votre endpoint réel
      const res = await client.assistants.postV1AssistantsList();
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