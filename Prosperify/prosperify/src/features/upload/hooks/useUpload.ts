import { useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
// ════════════════════════════════════════════════════════════════
// 📤 UPLOADS - Mutations pour upload de fichiers
// ════════════════════════════════════════════════════════════════

/**
 * ✅ Upload de texte brut
 * @example
 * const uploadText = useUploadText()
 * await uploadText.mutateAsync({ text: 'Mon contenu texte...' })
 */
export function useUploadText() {
  return useMutation({
    mutationFn: async (payload: { text: string }) => {
      const res = await prosperify.uploads.postV1UploadsText(payload); // ✅ updated: direct SDK call
      return {
        data: res?.data,
        eventMessage: res?.event?.code,
      };
    },
    onError: (error: any) => {
      console.error('[useUploadText]', error?.message || error);
    },
  });
}

/**
 * ✅ Upload de documents pour un assistant
 * @example
 * const uploadDocs = useUploadDocuments()
 * await uploadDocs.mutateAsync({
 *   assistantId: 'ast_123',
 *   files: selectedFiles
 * })
 */
export function useUploadDocuments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      assistantId,
      files,
    }: {
      assistantId: string;
      files: File[];
    }) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await prosperify.uploads.postV1UploadsDocuments(assistantId, formData as any); // ✅ updated: direct SDK call

      return {
        data: res?.data,
        eventMessage: res?.event?.code,
      };
    },
    onSuccess: (_, variables) => {
      // ✅ Invalide le cache des fichiers de l'assistant
      queryClient.invalidateQueries({
        queryKey: ['assistants', variables.assistantId, 'files'],
      });
    },
    onError: (error: any) => {
      console.error('[useUploadDocuments]', error?.message || error);
    },
  });
}

/**
 * ✅ Upload photo de profil assistant
 * @example
 * const uploadPfp = useUploadAssistantProfilePicture()
 * await uploadPfp.mutateAsync({
 *   assistantId: 'ast_123',
 *   file: selectedFile
 * })
 */
export function useUploadAssistantProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      assistantId,
      file,
    }: {
      assistantId: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await prosperify.uploads.postV1UploadsPfpAssistant(assistantId, formData as any); // ✅ updated: direct SDK call

      return {
        data: res?.data,
        profilePictureUrl: res?.data?.url,
        eventMessage: res?.event?.code,
      };
    },
    onSuccess: (_, variables) => {
      // ✅ Invalide le cache de l'assistant pour rafraîchir l'image
      queryClient.invalidateQueries({
        queryKey: ['assistants', variables.assistantId],
      });
    },
    onError: (error: any) => {
      console.error('[useUploadAssistantProfilePicture]', error?.message || error);
    },
  });
}

/**
 * ✅ Upload photo de profil utilisateur
 * @example
 * const uploadPfp = useUploadUserProfilePicture()
 * await uploadPfp.mutateAsync({
 *   userId: 'usr_123',
 *   file: selectedFile
 * })
 */
export function useUploadUserProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await prosperify.uploads.postV1UploadsPfpUser(userId, formData as any); // ✅ updated: direct SDK call

      return {
        data: res?.data,
        profilePictureUrl: res?.data?.url,
        eventMessage: res?.event?.code,
      };
    },
    onSuccess: (_, variables) => {
      // ✅ Invalide le cache de l'utilisateur
      queryClient.invalidateQueries({
        queryKey: ['users', variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
      });
    },
    onError: (error: any) => {
      console.error('[useUploadUserProfilePicture]', error?.message || error);
    },
  });
}

/**
 * ✅ Upload photo de profil organisation
 * @example
 * const uploadPfp = useUploadOrganizationProfilePicture()
 * await uploadPfp.mutateAsync({
 *   organizationId: 'org_123',
 *   file: selectedFile
 * })
 */
export function useUploadOrganizationProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      organizationId,
      file,
    }: {
      organizationId: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await prosperify.uploads.postV1UploadsPfpOrganization(organizationId, formData as any); // ✅ updated: direct SDK call

      return {
        data: res?.data,
        profilePictureUrl: res?.data?.url,
        eventMessage: res?.event?.code,
      };
    },
    onSuccess: (_, variables) => {
      // ✅ Invalide le cache de l'organisation
      queryClient.invalidateQueries({
        queryKey: ['organizations', variables.organizationId],
      });
    },
    onError: (error: any) => {
      console.error('[useUploadOrganizationProfilePicture]', error?.message || error);
    },
  });
}
