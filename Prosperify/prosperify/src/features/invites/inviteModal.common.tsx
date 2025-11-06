import React, { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import AlertError from '@/components/ui/base/Alert/alertError'
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess'
import { useCreateInvitation, useInvitations } from './hooks/useInvitations'

const InviteModal: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [notify, setNotify] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(false)
  const [colleagues, setColleagues] = useState<Array<{ name: string; email: string; role: string; isYou?: boolean }>>([
    { name: "You", email: "you@site.com", role: "Admin", isYou: true },
  ])

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { data: invitations = [], isLoading: invitesLoading, error: invitesError } = useInvitations()
  const createInvitation = useCreateInvitation()

  useEffect(() => {
    if (invitesError) {
      setError((invitesError as any)?.message || 'Erreur lors du chargement des invitations')
    }
  }, [invitesError])

  // map server invitations to colleague rows when available
  useEffect(() => {
    if (Array.isArray(invitations) && invitations.length > 0) {
      const mapped = invitations.map((inv: any, idx: number) => {
        // best-effort mapping — adapte selon shape réelle du backend
        const payload = inv?.data || inv
        const name = payload?.name || payload?.email || `Invite ${idx + 1}`
        const emailVal = payload?.email || payload?.inviteeEmail || ''
        const role = (payload?.roles && payload.roles[0]) || payload?.role || 'Invited'
        return { name, email: emailVal, role, isYou: false }
      })
      setColleagues(prev => {
        // keep local "you" row if present
        const you = prev.find((p) => p.isYou)
        return you ? [you, ...mapped] : mapped
      })
    }
  }, [invitations])

  const handleInvite = async () => {
    if (!email) return
    setError(null)
    try {
      const payload = { roles: [] as string[] } // adapt if backend expects email/other fields
      await createInvitation.mutateAsync(payload)
      // optimistic UX: add to list locally — real list will refresh when query invalidated
      setColleagues(prev => [...prev, { name: email, email, role: "Invited", isYou: false }])
      setEmail("")
      setSuccess('Invitation créée')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err?.message || "Erreur lors de l'invitation")
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText("https://www.figma.com/community/file/1179068859697769656")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0] ?? "")
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

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

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Invite team members</h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Add colleagues to collaborate on your workspace. They'll receive an email invitation.
          </p>
        </div>

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
                  <span className="text-xs font-medium text-neutral-600 px-3 py-1 bg-neutral-100 rounded-full">
                    {colleague.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">Share Read-Only Link</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value="https://www.figma.com/community/file/1179068859697769656"
              readOnly
              className="flex-1 px-4 py-2.5 text-sm border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-600 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default InviteModal
