import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useUpdateUser } from '../../hooks/useUsers';
import { User, Mail, Palette, Globe } from 'lucide-react';
import type { UserSummary } from '@/features/user/types/types';

const ProfileContent: React.FC = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const updateUser = useUpdateUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    theme: 'light' as 'light' | 'dark' | 'auto',
    language: 'en' as 'en' | 'fr',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        theme: currentUser.preferences?.theme || 'light',
        language: currentUser.preferences?.language || 'en',
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id) return;

    try {
      await updateUser.mutateAsync({
        id: currentUser.id,
        data: {
          name: formData.name,
          email: formData.email,
          preferences: {
            theme: formData.theme === 'auto' ? 'light' : formData.theme, // fallback sécurité
            language: formData.language,
          },
        },
      });
      setIsEditing(false);
      alert('✅ Profil mis à jour avec succès !');
    } catch (error) {
      alert('❌ Échec de la mise à jour du profil');
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        theme: currentUser.preferences?.theme || 'light',
        language: currentUser.preferences?.language || 'en',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center text-gray-500 py-8">
        Aucun utilisateur connecté.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profil utilisateur</h3>
          <p className="text-sm text-gray-500 mt-1">
            Gérez vos informations personnelles et vos préférences.
          </p>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={updateUser.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {updateUser.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-4 pb-6 border-b">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {formData.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{formData.name || 'Utilisateur'}</h4>
          <p className="text-sm text-gray-500">{formData.email}</p>
          {currentUser.verified && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
              ✓ Vérifié
            </span>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Nom complet */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User className="size-4" />
            Nom complet
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Mail className="size-4" />
            Adresse email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        {/* Thème */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Palette className="size-4" />
            Thème
          </label>
          <select
            value={formData.theme}
            onChange={(e) =>
              setFormData({ ...formData, theme: e.target.value as 'light' | 'dark' | 'auto' })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
            <option value="auto">Automatique</option>
          </select>
        </div>

        {/* Langue */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Globe className="size-4" />
            Langue
          </label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value as 'en' | 'fr' })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      {/* Account Info */}
      <div className="pt-6 border-t">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Informations du compte</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Date de création</p>
            <p className="font-medium text-gray-900">
              {currentUser['createdAt']
                ? new Date(currentUser['createdAt']).toLocaleDateString('fr-FR')
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Dernière connexion</p>
            <p className="font-medium text-gray-900">
              {currentUser['lastLoginAt']
                ? new Date(currentUser['lastLoginAt']).toLocaleDateString('fr-FR')
                : 'Jamais'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Rôles</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {currentUser.roles.map((role: string, i: number) => (
                <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileContent;
