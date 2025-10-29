export type Lang = 'en' | 'fr';

// Consolidated event messages collected from generated SDK services
const eventMessages: Record<Lang, Record<string, string>> = {
  en: {
    // Api Keys
    'api_key.created': 'API key created successfully.',

    // Auth
    'auth.sso.authorization.url.generated': 'SSO authorization URL generated.',
    'auth.sso.authorization.successful': 'SSO authorization successful.',
    'auth.email.verified': 'Email verified successfully.',
    'auth.verification.email.sent': 'Verification email sent.',
    'auth.password.reset.successful': 'Password reset successful.',
    'auth.token.refreshed': 'Token refreshed successfully.',
    'auth.token.revoked': 'Token revoked successfully.',

    // Users
    'user.created': 'User created successfully.',
    'user.authenticated': 'User authenticated successfully.',
    'user.updated': 'User updated successfully.',
    'user.deleted': 'User deleted successfully.',
    'user.retrieved': 'User retrieved successfully.',
    'user.role.added': 'Role added to user.',
    'user.role.removed': 'Role removed from user.',
    'users.listed': 'Users listed successfully.',
    'user.scopes.retrieved': 'User scopes retrieved successfully.',

    // Roles
    'role.created': 'Role created successfully.',
    'role.deleted': 'Role deleted successfully.',
    'role.updated': 'Role updated successfully.',
    'role.retrieved': 'Role retrieved successfully.',
    'roles.listed': 'Roles listed successfully.',

    // Metrics
    'metrics.listed': 'Metrics listed successfully.',
    'metric.retrieved': 'Metric retrieved successfully.',

    // API generic / domain events (assistants, files, folders, threads, uploads, invitations, logs)
    'api.assistant.created': 'Assistant created successfully.',
    'assistant.created': 'Assistant created successfully.',
    'files.listed': 'Files listed successfully.',
    'file.deleted': 'File deleted successfully.',
    'file.retrieved': 'File retrieved successfully.',
    'folders.listed': 'Folders listed successfully.',
    'folder.created': 'Folder created successfully.',
    'thread.created': 'Thread created successfully.',
    'uploads.documents.uploaded': 'Documents uploaded successfully.',
    // fallback: any other codes will be returned as-is
  },
  fr: {
    // Api Keys
    'api_key.created': 'Clé API créée avec succès.',

    // Auth
    'auth.sso.authorization.url.generated': "URL d'autorisation SSO générée.",
    'auth.sso.authorization.successful': "Autorisation SSO réussie.",
    'auth.email.verified': "E-mail vérifié avec succès.",
    'auth.verification.email.sent': "E-mail de vérification envoyé.",
    'auth.password.reset.successful': "Réinitialisation du mot de passe réussie.",
    'auth.token.refreshed': "Jeton rafraîchi avec succès.",
    'auth.token.revoked': "Jeton révoqué avec succès.",

    // Users
    'user.created': "Utilisateur créé avec succès.",
    'user.authenticated': "Utilisateur authentifié avec succès.",
    'user.updated': "Utilisateur mis à jour avec succès.",
    'user.deleted': "Utilisateur supprimé avec succès.",
    'user.retrieved': "Utilisateur récupéré avec succès.",
    'user.role.added': "Rôle ajouté à l'utilisateur.",
    'user.role.removed': "Rôle retiré à l'utilisateur.",
    'users.listed': "Liste des utilisateurs récupérée.",
    'user.scopes.retrieved': "Périmètres de l'utilisateur récupérés.",

    // Roles
    'role.created': "Rôle créé avec succès.",
    'role.deleted': "Rôle supprimé avec succès.",
    'role.updated': "Rôle mis à jour avec succès.",
    'role.retrieved': "Rôle récupéré avec succès.",
    'roles.listed': "Liste des rôles récupérée.",

    // Metrics
    'metrics.listed': "Métriques listées avec succès.",
    'metric.retrieved': "Métrique récupérée avec succès.",

    // Domain events
    'api.assistant.created': "Assistant créé avec succès.",
    'assistant.created': "Assistant créé avec succès.",
    'files.listed': "Fichiers listés avec succès.",
    'file.deleted': "Fichier supprimé avec succès.",
    'file.retrieved': "Fichier récupéré avec succès.",
    'folders.listed': "Dossiers listés avec succès.",
    'folder.created': "Dossier créé avec succès.",
    'thread.created': "Conversation créée avec succès.",
    'uploads.documents.uploaded': "Documents téléversés avec succès.",
  },
};

// Consolidated HTTP / API error messages used across services
const errorMessages: Record<Lang, Record<string, string>> = {
  en: {
    '400': 'Bad Request - Validation Error.',
    '401': 'Authentication Error - Please login or provide valid credentials.',
    '403': 'Authorization Error - Access denied.',
    '404': 'Not Found - The requested resource does not exist.',
    '409': 'Conflict - Resource already exists or conflict detected.',
    '422': 'Unprocessable Entity - Invalid input or file type.',
    '500': 'Server Error - An internal server error occurred.',
  },
  fr: {
    '400': 'Requête invalide - Erreur de validation.',
    '401': "Erreur d'authentification - Veuillez vous connecter ou fournir des identifiants valides.",
    '403': "Erreur d'autorisation - Accès refusé.",
    '404': "Introuvable - La ressource demandée n'existe pas.",
    '409': "Conflit - La ressource existe déjà ou conflit détecté.",
    '422': "Entité non traitable - Entrée invalide ou type de fichier non supporté.",
    '500': "Erreur serveur - Une erreur interne s'est produite.",
  },
};

export function getEventMessage(code?: string, lang: Lang = 'en'): string | undefined {
  if (!code) return undefined;
  return eventMessages[lang][code] ?? code;
}

export function getErrorMessage(code?: number | string, lang: Lang = 'en'): string | undefined {
  if (code == null) return undefined;
  const key = String(code);
  return errorMessages[lang][key] ?? `Unknown error (${key})`;
}

export default { eventMessages, errorMessages, getEventMessage, getErrorMessage };
