📚 Prosperify - Documentation d'implémentation
🎯 Vue d'ensemble
Architecture full-stack avec React + TypeScript (frontend) et NestJS (backend), utilisant un SDK auto-généré depuis OpenAPI pour garantir la cohérence des types et des appels API.

🏗️ Architecture en couches
L'application suit une architecture en 4 couches distinctes :

1. UI Layer (React Components) - Gère l'affichage, la validation des formulaires, les états de chargement et les erreurs utilisateur. Composants : Login, Register, Dashboard, etc.

2. State Management (Zustand Stores) - Gère l'état global de l'application avec persistence dans localStorage. Exemple : useAuthStore pour l'authentification.

3. SDK Layer (ProsperifyClient) - Wrapper type-safe auto-généré depuis l'OpenAPI spec. Encapsule tous les appels API avec typage complet.

4. API Layer (Backend NestJS) - Endpoints RESTful, validation des données, logique métier et accès base de données.

🔐 Système d'authentification
Endpoints implémentés
POST /v1/auth/login - Connexion utilisateur. Renvoie token JWT + refreshToken + données utilisateur.

POST /v1/auth/register - Inscription utilisateur. Paramètres : email, password, name.

POST /v1/auth/logout - Déconnexion. Nécessite le token JWT dans les headers.

POST /v1/auth/refresh - Renouvellement du token JWT. Paramètres : refreshToken.

Flux d'authentification
L'utilisateur soumet le formulaire de login qui appelle useAuthStore().login(email, password). Le store crée une instance de ProsperifyClient sans token et appelle client.auth.postV1AuthLogin(). L'API backend valide les credentials et renvoie le token, refreshToken et les données utilisateur. Le store Zustand sauvegarde ces données dans l'état global ET dans localStorage via le middleware persist. Le composant redirige vers le dashboard et toutes les futures requêtes utilisent automatiquement le token stocké.

🎨 ProsperifyClient - SDK Principal
Le ProsperifyClient est un wrapper type-safe autour de l'API backend, généré automatiquement depuis la spécification OpenAPI. Il garantit que le frontend et le backend restent synchronisés au niveau des types.

Configuration
Le client configure OpenAPI.BASE avec l'URL du backend, OpenAPI.TOKEN avec le JWT si fourni, et OpenAPI.HEADERS avec la clé API si nécessaire. Tous les services sont injectés automatiquement (AuthService, OrganizationService, etc.).

Utilisation
Pour les endpoints sans authentification comme login et register, on crée une instance sans token. Pour les endpoints protégés, on passe le token JWT dans la configuration.

🪝 useProsperify Hook
Hook React personnalisé qui simplifie l'utilisation du SDK dans les composants.

Responsabilités
Crée automatiquement une instance de ProsperifyClient avec le token actuel depuis le store. Gère l'auto-refresh du token toutes les 14 minutes pour éviter l'expiration. S'adapte selon si l'endpoint nécessite l'authentification ou non.

Paramètres
requireAuth (boolean) - True si l'endpoint nécessite le token JWT. Default: true.

includeApiKey (boolean) - True pour inclure la clé API dans les headers. Default: false.

Auto-refresh
Un effet React avec setInterval vérifie toutes les 14 minutes si le token doit être renouvelé. Si l'utilisateur est authentifié, appelle automatiquement refreshAccessToken(). En cas d'erreur, log l'erreur mais ne déconnecte pas l'utilisateur pour éviter les interruptions.

Exemples d'utilisation
Pour un endpoint protégé comme le dashboard : const prosperify = useProsperify(true) puis const data = await prosperify.organizations.getV1Organizations().

Pour un endpoint public comme login : const prosperify = useProsperify(false) puis await prosperify.auth.postV1AuthLogin({ email, password }).

🗄️ AuthStore - État global avec Zustand
Store Zustand qui centralise toute la logique d'authentification de l'application.

État persisté
user - Objet contenant id, email, name, organization de l'utilisateur connecté.

token - JWT token d'accès pour les requêtes authentifiées.

refreshToken - Token de rafraîchissement pour renouveler le JWT.

isAuthenticated - Boolean indiquant si l'utilisateur est connecté.

Actions disponibles
login(email, password) - Appelle l'API de connexion, stocke le token et les données utilisateur, retourne un message de succès.

register(email, password, name) - Appelle l'API d'inscription, connecte automatiquement l'utilisateur après inscription.

logout() - Appelle l'API de déconnexion si un token existe, nettoie complètement l'état et le localStorage.

refreshAccessToken() - Renouvelle le token JWT avec le refreshToken, met à jour le store avec le nouveau token, déconnecte l'utilisateur si le refresh échoue.

setUser(user) - Met à jour manuellement les données utilisateur.

Persistence
Utilise le middleware persist de Zustand pour sauvegarder automatiquement dans localStorage sous la clé 'auth-storage'. Seuls les champs importants sont persistés : user, token, refreshToken, isAuthenticated. Les actions ne sont pas persistées, elles sont recréées à chaque chargement.

Gestion des erreurs
Toutes les actions interceptent les erreurs de l'API et les transforment en messages clairs. En cas d'erreur serveur, extrait le message de error.body.message ou utilise un message par défaut. Les erreurs sont propagées aux composants pour affichage dans l'UI.

📁 Structure des fichiers
src/core/ProsperifyClient.ts - SDK client principal avec injection des services.

src/core/hooks/useProsperify.ts - Hook React pour utiliser le SDK avec auto-refresh.

src/features/auth/pages/login.auth.tsx - Page de connexion avec validation et gestion d'erreurs.

src/features/auth/pages/register.auth.tsx - Page d'inscription avec confirmation de mot de passe.

src/features/auth/store/AuthStore.ts - Store Zustand pour l'authentification globale.

src/sdk/services/AuthService.ts - Service auto-généré pour les endpoints d'auth.

src/sdk/core/OpenAPI.ts - Configuration globale de l'OpenAPI client.

src/components/ui/base/Alert/ - Composants d'alertes pour le feedback utilisateur.

✅ Fonctionnalités implémentées
Authentification complète - Login, Register, Logout avec JWT.

Refresh automatique - Auto-refresh du token toutes les 14 minutes.

Persistence - État sauvegardé dans localStorage via Zustand persist.

Type-safety - Tous les appels API sont type-safe grâce au SDK généré.

Error handling - Gestion centralisée des erreurs API.

Loading states - États de chargement sur tous les formulaires.

Validation - Validation côté client avant soumission (email, password 8+ chars).

Auto-redirect - Redirection automatique si déjà connecté.

Success feedback - Alertes de succès après chaque action.

❌ Fonctionnalités manquantes (par priorité)
Critiques (HAUTE priorité)
Protected Routes - Middleware React Router pour bloquer l'accès aux routes privées sans authentification.

Email Verification - Système de confirmation par email après inscription avec token unique.

Forgot Password - Flow complet de récupération : demande email, envoi lien, reset password.

Token Expiration Handler - Interceptor global pour détecter les 401 et auto-refresh avant de retry.

Importantes (MOYENNE priorité)
Google OAuth - Connexion via Google avec redirection vers backend OAuth.

2FA (Two-Factor Auth) - Authentification à deux facteurs par SMS ou app.

Session Management - Gérer plusieurs appareils connectés simultanément.

Profile Update - Permettre modification du nom, email, mot de passe utilisateur.

Optionnelles (BASSE priorité)
Remember Me - Checkbox pour augmenter la durée de validité du token.

Login History - Historique des dernières connexions avec IP et device.

Device Management - Liste des appareils connectés avec option de déconnexion.

🚀 Prochaines étapes recommandées
1. Implémenter les Protected Routes - Créer un composant ProtectedRoute qui vérifie isAuthenticated et redirige vers /login si false. Wrapper toutes les routes privées avec ce composant dans App.tsx.

2. Ajouter un interceptor global - Modifier le fichier SDK généré pour intercepter les réponses 401. Tenter un refresh automatique du token puis retry la requête originale.

3. Créer la page Forgot Password - Nouveau endpoint backend /v1/auth/forgot-password qui envoie un email. Page frontend avec formulaire email simple et confirmation de l'envoi.

4. Email Verification - Backend génère un token de vérification à l'inscription. Email avec lien de confirmation vers /verify-email?token=xxx. Route frontend qui appelle l'API de vérification et affiche succès/erreur.

🧪 Testing recommandé
Tester le login avec credentials valides puis invalides. Vérifier que le token est bien stocké dans localStorage. Tester le logout et vérifier que le localStorage est nettoyé. Simuler un token expiré et vérifier que le refresh fonctionne. Tester l'inscription avec mot de passe trop court ou emails non matchés. Vérifier que les redirections automatiques fonctionnent après login/register.

📦 Variables d'environnement
Créer un fichier .env à la racine du projet avec VITE_API_BASE_URL pour l'URL du backend API et VITE_API_KEY pour la clé API si nécessaire.

🎯 Philosophie de l'architecture
Séparation des responsabilités - Chaque couche a un rôle précis et ne doit pas mélanger les concerns.

Single Source of Truth - Le store Zustand est l'unique source de vérité pour l'état auth.

Type-safety First - Le SDK généré garantit la cohérence des types entre frontend et backend.

DRY (Don't Repeat Yourself) - La logique métier est centralisée dans les stores, pas dupliquée dans les composants.

Progressive Enhancement - L'architecture permet d'ajouter facilement de nouveaux endpoints et features.

Version : 1.0.0
Dernière mise à jour : 2025-01-01
Contributeur : Briki - Lead Developer