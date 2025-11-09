import React, { useEffect, useState } from 'react';
import { useOrganizations } from '@/features/organization/hooks/useOrganizations';
import Button from '@/components/ui/base/Button/Button.common';
import AlertError from '@/components/ui/base/Alert/alertError';

interface GeneralInfoContentProps {
  organizationId: string;
}

const ProfileOrganization: React.FC<GeneralInfoContentProps> = ({ organizationId }) => {
  const orgs = useOrganizations();
  const { data: organization, isLoading, error } = orgs.useOrganization(organizationId);
  const updateOrganization = orgs.useUpdate();

  const [name, setName] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (organization?.name) setName(organization.name);
  }, [organization]);

  const handleSave = async () => {
    try {
      await updateOrganization.mutateAsync({
        organizationId,
        payload: { name },
      });
      setSuccess('Organisation mise à jour avec succès.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <AlertError
        message="Erreur lors du chargement de l'organisation."
        description={(error as any)?.message || ''}
        onClose={() => {}}
      />
    );
  }

  return (
    <div>
      <div className="mb-10">
        <label className="font-semibold block text-base mb-2">Organization ID</label>
        <input
          type="text"
          value={organizationId}
          readOnly
          className="border border-gray-200 p-2 rounded w-2/3"
        />
      </div>

      <div className="mt-4">
        <label className="font-semibold block text-base mb-2">Nom de l'organisation</label>
        <input
          type="text"
          className="border border-gray-200 p-2 rounded w-2/3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <Button onClick={handleSave} text="Enregistrer" buttonColor="green" />
      </div>

      {success && (
        <p className="mt-2 text-green-700 text-sm font-medium">{success}</p>
      )}
    </div>
  );
};

export default ProfileOrganization;
