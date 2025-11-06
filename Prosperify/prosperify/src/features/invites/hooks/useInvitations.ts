import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';

export interface InvitationCreatePayload {
  expiresIn?: number;
  maxUsage?: number;
  roles?: string[];
}

export function useInvitations(params?: { limit?: number; order?: 'asc' | 'desc'; page?: number }) {
  const { limit, order, page } = params ?? {};

  return useQuery({
    queryKey: ['invitations', 'list', limit ?? null, order ?? null, page ?? null],
    queryFn: async () => {
      const res = await prosperify.invitations.postV1InvitationsList({
        ...(limit !== undefined ? { limit } : {}),
        ...(order ? { order } : {}),
        ...(page !== undefined ? { page } : {}),
      });
      return (res?.data?.invitations || []) as any[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: InvitationCreatePayload) => {
      return prosperify.invitations.postV1InvitationsNew(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

export function useDeleteInvitation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return prosperify.invitations.deleteV1Invitations(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['invitations'] }),
  });
}

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: async (id: string) => {
      return prosperify.invitations.getV1InvitationsAccept(id);
    },
  });
}