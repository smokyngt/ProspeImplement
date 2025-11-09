import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import AlertError from '@/components/ui/base/Alert/alertError';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import { useCreateInvitation, useInvitations, useDeleteInvitation } from './hooks/useInvitations';

const InviteModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState(true);
  const [copied, setCopied] = useState(false);
  const [colleagues, setColleagues] = useState<
    Array<{ name: string; email: string; role: string; id?: string; isYou?: boolean }>
  >([{ name: "You", email: "you@site.com", role: "Admin", isYou: true }]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { data, isLoading: invitesLoading, error: invitesError } = useInvitations();
  const createInvitation = useCreateInvitation();
  const deleteInvitation = useDeleteInvitation();

  const invitations = data?.items ?? [];

  useEffect(() => {
    if (invitesError) {
      setError((invitesError as any)?.message || 'Erreur lors du chargement des invitations');
    }
  }, [invitesError]);

  // Met à jour la liste locale depuis le serveur
  useEffect(() => {
    if (Array.isArray(invitations) && invitations.length > 0) {
      const mapped = invitations.map((inv: any, idx: number) => {
        const payload = inv?.data || inv;
        return {
          id: payload.id,
          name: `Invite ${idx + 1}`,
          email: payload.email || '',
          role: (payload.roles && payload.roles[0]) || 'Invited',
          isYou: false,
        };
      });
      setColleagues(prev => {
        const you = prev.find(p => p.isYou);
        return you ? [you, ...mapped] : mapped;
      });
    }
  }, [invitations]);

  // Crée une nouvelle invitation
  const handleInvite = async () => {
    if (!email) return;
    setError(null);

    try {
      const payload = {
        expiresIn: 3600, // expire dans 1h
        maxUsage: 1,
        roles: ['member'], // rôle par défaut
      };

      const newInvite = await createInvitation.mutateAsync(payload);

      // UX optimiste : ajoute l'utilisateur à la liste
      setColleagues(prev => [
        ...prev,
        { id: newInvite.id, name: email, email, role: "Invited", isYou: false },
      ]);

      setEmail("");
      setSuccess('Invitation créée avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la création de l'invitation");
    }
  };

  // Supprime une invitation existante
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteInvitation.mutateAsync(id);
      setColleagues(prev => prev.filter(c => c.id !== id));
      setSuccess("Invitation supprimée");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la suppression");
    }
  };

  // Copie un lien d’invitation générique
  const handleCopy = async (id?: string) => {
    const baseUrl = window.location.origin;
    const inviteLink = id ? `${baseUrl}/invite/${id}` : baseUrl;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map(n => n[0] ?? "")
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError message={error} onClose={() => setError(null)} description={''} />
        </div>
      )}
      {success && (
        <div className="fixed top-4 right-4 z-50">
          <AlertSuccess message={success} onClose={() => setSuccess(null)} />
        </div>
      )}

      <section className="w-full max-w-6xl p-4">
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Invitations</h2>
          <p className="text-sm text-gray-600">Invite colleagues to your workspace.</p>
        </header>

        {/* Champ email + bouton */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
              className="flex-1 px-4 py-2.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400"
            />
            <button
              onClick={handleInvite}
              disabled={!email || createInvitation.isPending}
              className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
            >
              {createInvitation.isPending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Option notify */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="checkbox"
            id="notify"
            checked={notify}
            onChange={() => setNotify(!notify)}
            className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900 cursor-pointer"
          />
          <label htmlFor="notify" className="text-sm text-neutral-600 cursor-pointer select-none">
            Notify recipients via email
          </label>
        </div>

        {/* Liste des invitations */}
        <div className="mb-8">
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
            Team Members ({colleagues.length})
          </h3>

          {invitesLoading ? (
            <div className="px-6 py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-1">
              {colleagues.map((colleague, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {getInitials(colleague.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-900">{colleague.name}</span>
                        {colleague.isYou && <span className="text-xs text-neutral-500">(you)</span>}
                      </div>
                      <span className="text-xs text-neutral-500">{colleague.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-600 px-3 py-1 bg-neutral-100 rounded-full">
                      {colleague.role}
                    </span>
                    {!colleague.isYou && (
                      <>
                        <button
                          onClick={() => handleCopy(colleague.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Copy Link
                        </button>
                        <button
                          onClick={() => handleDelete(colleague.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default InviteModal;
