import React, { useState } from 'react';
import  { useCurrentUser } from '../../hooks/useCurrentUser';
import  { useUpdateUser } from '../../hooks/useUsers';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

const PasswordContent: React.FC = () => {
  const { data: currentUser } = useCurrentUser();
  const updateUser = useUpdateUser();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string): string[] => {
    const issues: string[] = [];
    if (password.length < 8) issues.push('Au moins 8 caractères');
    if (!/[A-Z]/.test(password)) issues.push('Une majuscule');
    if (!/[a-z]/.test(password)) issues.push('Une minuscule');
    if (!/[0-9]/.test(password)) issues.push('Un chiffre');
    return issues;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id) return;

    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.currentPassword) {
      newErrors['currentPassword'] = 'Le mot de passe actuel est requis';
    }

    const passwordIssues = validatePassword(formData.newPassword);
    if (passwordIssues.length > 0) {
      newErrors['newPassword'] = `Requis: ${passwordIssues.join(', ')}`;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors['confirmPassword'] = 'Les mots de passe ne correspondent pas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateUser.mutateAsync({
        id: currentUser.id,
        data: {
          password: formData.newPassword,
        },
      });

      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
      alert('✅ Mot de passe mis à jour avec succès !');
    } catch (error) {
      alert('❌ Erreur lors de la mise à jour du mot de passe');
      console.error(error);
    }
  };

  const passwordStrength = (password: string): { label: string; color: string; width: string } => {
    if (!password) return { label: '', color: '', width: '0%' };
    const issues = validatePassword(password);
    if (issues.length === 0) return { label: 'Fort', color: 'bg-green-500', width: '100%' };
    if (issues.length <= 2) return { label: 'Moyen', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Faible', color: 'bg-red-500', width: '33%' };
  };

  const strength = passwordStrength(formData.newPassword);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h3>
        <p className="text-sm text-gray-500 mt-1">
          Assurez-vous d'utiliser un mot de passe fort et sécurisé
        </p>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Shield className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-2">Conseils de sécurité</p>
            <ul className="space-y-1 text-blue-800">
              <li>• Utilisez au moins 8 caractères</li>
              <li>• Mélangez majuscules, minuscules, chiffres</li>
              <li>• N'utilisez pas d'informations personnelles</li>
              <li>• Ne réutilisez pas de mots de passe</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Password */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Lock className="size-4" />
          Mot de passe actuel
        </label>
        <div className="relative">
          <input
            type={showPasswords.current ? 'text' : 'password'}
            value={formData.currentPassword}
            onChange={(e) => {
              setFormData({ ...formData, currentPassword: e.target.value });
              setErrors({ ...errors, currentPassword: '' });
            }}
            className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors['currentPassword'] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({ ...showPasswords, current: !showPasswords.current })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.current ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {errors['currentPassword'] && (
          <p className="text-xs text-red-600 mt-1">{errors['currentPassword']}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Lock className="size-4" />
          Nouveau mot de passe
        </label>
        <div className="relative">
          <input
            type={showPasswords.new ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={(e) => {
              setFormData({ ...formData, newPassword: e.target.value });
              setErrors({ ...errors, newPassword: '' });
            }}
            className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors['newPassword'] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.new ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {errors['newPassword'] && <p className="text-xs text-red-600 mt-1">{errors['newPassword']}</p>}

        {/* Password Strength */}
        {formData.newPassword && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Force du mot de passe</span>
              <span className={`text-xs font-semibold ${strength.color.replace('bg-', 'text-')}`}>
                {strength.label}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: strength.width }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Lock className="size-4" />
          Confirmer le nouveau mot de passe
        </label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setErrors({ ...errors, confirmPassword: '' });
            }}
            className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors['confirmPassword'] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.confirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {errors['confirmPassword'] && (
          <p className="text-xs text-red-600 mt-1">{errors['confirmPassword']}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t">
        <button
          type="submit"
          disabled={updateUser.isPending}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {updateUser.isPending ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
        </button>
      </div>
    </form>
  );
};

export default PasswordContent;