import React, { useState } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useUsers } from '../../hooks/useUsers'; // ✅ on importe le hook principal
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteAccountContent: React.FC = () => {
  const { data: currentUser } = useCurrentUser();
  const { useDelete } = useUsers(); // ✅ on récupère le sous-hook depuis useUsers()
  const deleteUser = useDelete();   // ✅ on l’instancie ici
  const navigate = useNavigate();

  const [confirmText, setConfirmText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!currentUser?.id) return;
    if (confirmText !== 'SUPPRIMER') {
      alert('⚠️ Veuillez taper SUPPRIMER pour confirmer');
      return;
    }

    try {
      await deleteUser.mutateAsync(currentUser.id);
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      alert('❌ Erreur lors de la suppression du compte');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="size-6 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-900 mb-2">Zone de danger</h4>
            <p className="text-sm text-red-800">
              La suppression de votre compte est <strong>irréversible</strong>. Toutes vos données
              seront définitivement perdues.
            </p>
          </div>
        </div>
      </div>

      {/* Consequences */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Conséquences de la suppression :
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-500">•</span>
            <span>Perte de tous vos assistants et conversations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500">•</span>
            <span>Suppression de tous vos fichiers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500">•</span>
            <span>Révocation de toutes vos clés API</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500">•</span>
            <span>Déconnexion immédiate de tous les appareils</span>
          </li>
        </ul>
      </div>

      {/* Delete Button */}
      <div className="pt-6 border-t">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <Trash2 className="size-4" />
          Supprimer définitivement mon compte
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="size-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Confirmer la suppression</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Cette action est <strong>irréversible</strong>. Pour confirmer, tapez{' '}
              <code className="px-2 py-1 bg-gray-100 rounded text-red-600 font-mono">
                SUPPRIMER
              </code>
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Tapez SUPPRIMER"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setConfirmText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText !== 'SUPPRIMER' || deleteUser.isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteUser.isPending ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountContent;
