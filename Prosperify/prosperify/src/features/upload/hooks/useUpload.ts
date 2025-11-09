import { useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import { toast } from 'sonner';

interface UploadTextPayload {
  text: string;
}

interface UploadDocumentsPayload {
  assistantId: string;
  files: File[];
}

interface UploadPfpPayload {
  id: string;
  file: File;
}

interface UploadResponse {
  data?: Record<string, any>;
  event?: any;
  eventMessage?: string;
  timestamp?: number;
}

/**
 * Hook centralisé pour toutes les opérations d'upload
 * Utilise le ProsperifyClient pour automatiser les messages i18n
 */
export function useUploads() {
  const queryClient = useQueryClient();

  return {
    /**
     * Upload de texte brut
     */
    useUploadText: () => {
      return useMutation<UploadResponse, Error, UploadTextPayload>({
        mutationFn: async ({ text }) => {
          const response = await prosperify.uploads.postV1UploadsText({ text });
          return response;
        },
        onSuccess: (data) => {
          toast.success(data.eventMessage || 'Texte uploadé avec succès');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Erreur lors de l\'upload du texte');
        },
      });
    },

    /**
     * Upload de documents pour un assistant
     */
    useUploadDocuments: () => {
      return useMutation<UploadResponse, Error, UploadDocumentsPayload>({
        mutationFn: async ({ assistantId, files }) => {
          // Construction du formData compatible avec l'API
          const formData = {
            files: {
              encoding: 'utf-8',
              fieldname: 'files',
              filename: files[0].name,
              mimetype: files[0].type as any,
            },
          };

          const response = await prosperify.uploads.postV1UploadsDocuments(
            assistantId,
            formData
          );
          return response;
        },
        onSuccess: (data, variables) => {
          // Invalider les queries de fichiers pour cet assistant
          queryClient.invalidateQueries({ 
            queryKey: ['files', 'list', { assistantId: variables.assistantId }] 
          });
          queryClient.invalidateQueries({ 
            queryKey: ['sources', variables.assistantId] 
          });

          toast.success(data.eventMessage || 'Document uploadé avec succès');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Erreur lors de l\'upload du document');
        },
      });
    },

    /**
     * Upload photo de profil pour un assistant
     */
    useUploadAssistantPfp: () => {
      return useMutation<UploadResponse, Error, UploadPfpPayload>({
        mutationFn: async ({ id: assistantId, file }) => {
          const formData = {
            file: file as unknown as Record<string, any>,
          };

          const response = await prosperify.uploads.postV1UploadsPfpAssistant(
            assistantId,
            formData
          );
          return response;
        },
        onSuccess: (data, variables) => {
          // Invalider le cache de l'assistant
          queryClient.invalidateQueries({ 
            queryKey: ['assistants', variables.id] 
          });
          queryClient.invalidateQueries({ 
            queryKey: ['assistants', 'list'] 
          });

          toast.success(data.eventMessage || 'Photo de profil mise à jour');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Erreur lors de l\'upload de la photo');
        },
      });
    },

    /**
     * Upload photo de profil pour un utilisateur
     */
    useUploadUserPfp: () => {
      return useMutation<UploadResponse, Error, UploadPfpPayload>({
        mutationFn: async ({ id: userId, file }) => {
          const formData = {
            file: file as unknown as Record<string, any>,
          };

          const response = await prosperify.uploads.postV1UploadsPfpUser(
            userId,
            formData
          );
          return response;
        },
        onSuccess: (data, variables) => {
          // Invalider le cache de l'utilisateur
          queryClient.invalidateQueries({ 
            queryKey: ['users', variables.id] 
          });
          queryClient.invalidateQueries({ 
            queryKey: ['users', 'list'] 
          });

          toast.success(data.eventMessage || 'Photo de profil mise à jour');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Erreur lors de l\'upload de la photo');
        },
      });
    },

    /**
     * Upload photo de profil pour une organisation
     */
    useUploadOrganizationPfp: () => {
      return useMutation<UploadResponse, Error, UploadPfpPayload>({
        mutationFn: async ({ id: organizationId, file }) => {
          const formData = {
            file: file as unknown as Record<string, any>,
          };

          const response = await prosperify.uploads.postV1UploadsPfpOrganization(
            organizationId,
            formData
          );
          return response;
        },
        onSuccess: (data, variables) => {
          // Invalider le cache de l'organisation
          queryClient.invalidateQueries({ 
            queryKey: ['organizations', 'detail', variables.id] 
          });
          queryClient.invalidateQueries({ 
            queryKey: ['organizations', 'all'] 
          });

          toast.success(data.eventMessage || 'Photo de profil mise à jour');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Erreur lors de l\'upload de la photo');
        },
      });
    },
  };
}