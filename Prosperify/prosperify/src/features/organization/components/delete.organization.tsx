import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizations } from '@/features/organization/hooks/useOrganizations';
import AlertError from '@/components/ui/base/Alert/alertError';

interface DeleteOrganizationProps {
  organizationId: string;
}

const DeleteContentOrganization: React.FC<DeleteOrganizationProps> = ({ organizationId }) => {
  const navigate = useNavigate();
  const orgs = useOrganizations();
  const deleteOrganization = orgs.useDelete();

  const [confirmText, setConfirmText] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmText.toUpperCase() !== 'DELETE') {
      setValidationError('Veuillez taper "DELETE" pour confirmer la suppression.');
      return;
    }

    setValidationError(null);
    try {
      await deleteOrganization.mutateAsync(organizationId);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
      {validationError && (
        <div className="mb-4">
          <AlertError
            message={validationError}
            onClose={() => setValidationError(null)}
            description=""
          />
        </div>
      )}

      {deleteOrganization.error && (
        <div className="mb-4">
          <AlertError
            message={
              (deleteOrganization.error as any)?.message ||
              "Erreur lors de la suppression de l'organisation."
            }
            onClose={() => deleteOrganization.reset()}
            description=""
          />
        </div>
      )}

      <h3 className="font-semibold text-lg text-red-700 mb-2">🗑️ Supprimer l'organisation</h3>
      <p className="text-sm text-gray-700 mb-4">
        Cette action est <strong className="text-red-600">irréversible</strong>. Toutes les
        données, membres et paramètres seront définitivement supprimés.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Pour confirmer, tapez{' '}
          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-mono text-xs">
            DELETE
          </span>
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
          className="border border-red-300 p-2 rounded w-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
          disabled={deleteOrganization.isPending}
        />
      </div>

      <button
        onClick={handleDelete}
        disabled={deleteOrganization.isPending || confirmText.toUpperCase() !== 'DELETE'}
        className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
      >
        {deleteOrganization.isPending ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Suppression en cours...
          </>
        ) : (
          'Supprimer définitivement'
        )}
      </button>
    </div>
  );
};

export default DeleteContentOrganization;
