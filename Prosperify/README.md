# Prosperify – Frontend

Interface moderne en **React + TypeScript** pour la gestion d’assistants IA, d’organisations, d’utilisateurs et de ressources documentaires.

---

## ✨ Fonctionnalités principales

- 🔑 Authentification complète (login, inscription, vérification email, mot de passe oublié)  
- 🤖 Gestion multi-assistants (settings, sources, export, playground dédié)  
- 🏢 Espace Organisation (API Keys, rôles, logs, statistiques, invitations)  
- 👤 Dashboard Utilisateur & Organisation (navigation imbriquée via React Router)  
- 🧩 Composants UI réutilisables (boutons, inputs, alertes, modales, uploads, sidebar, navbar)  
- 🎨 Thématisation + Dark/Light mode (TailwindCSS + Preline)  
- 📊 Charts interactifs (**ApexCharts**)  
- 📦 Upload avancé (Dropzone, @preline/file-upload)  
- 🖱️ Drag & Drop provider prêt (DndProvider)  

---

## 🧱 Structure du projet

prosperify/
public/ # Assets statiques
src/
assets/ # Images & icônes
components/ # Composants réutilisables (base, dashboard, etc.)
features/ # Modules métiers (auth, user, orga, assistant, chat, file...)
pages/ # Pages haut-niveau (routing direct)
types/ # Types TypeScript partagés (DTOs, schémas)
App.tsx # Routage principal
main.tsx # Entrée React
vite.config.ts # Config Vite + alias @
tailwind.config.js # Thème Tailwind étendu
postcss.config.js # PostCSS
tsconfig*.json # Config TypeScript
eslint.config.js # Règles ESLint / Prettier

yaml
Copier le code

---

## 🛠️ Stack & dépendances clés

| Domaine      | Outils                                                                 |
|--------------|------------------------------------------------------------------------|
| **UI**       | React 18, TailwindCSS, Preline, Lucide Icons                           |
| **Forms**    | @tailwindcss/forms, Dropzone, @preline/file-upload                     |
| **Charts**   | ApexCharts                                                             |
| **Animations** | framer-motion, tailwindcss-animate                                   |
| **Routing**  | react-router-dom                                                       |
| **Utils**    | lodash, clsx, tailwind-merge, class-variance-authority                 |
| **Qualité**  | ESLint, Prettier, TypeScript                                           |

---

## 🔧 Installation & Démarrage

**Prérequis** : Node.js ≥ 18

```bash
git clone <repo-url>
cd prosperify
npm install   # ou pnpm install / yarn install
npm run dev   # démarre le serveur de dev
Scripts disponibles :
npm run dev → développement avec HMR

npm run build → build production (tsc + vite)

npm run preview → prévisualisation du build

npm run lint → vérification ESLint

🧩 Routage principal (App.tsx)
/ : Accueil (hero, démonstrations)

/auth/* : Authentification (login, register, password, email)

/assistant/:id/* : Espace assistant (index, settings, sources, export, playground)

/dashboard-user : Espace utilisateur

/dashboard-orga : Espace organisation (assistants, rôles, logs, API Keys...)

/subscription/* : Gestion abonnements

🎨 Styles & Thème
TailwindCSS avec variables CSS (--primary, --accent, etc.)

Dark/Light mode via Preline (hook global de switch thème)

Animations personnalisées (fade-in, transitions fluides)

@tailwindcss/forms pour les formulaires

🔌 Alias
Alias défini dans vite.config.ts :

ts
Copier le code
alias: { '@': path.resolve(__dirname, './src') }
Utilisation :

ts
Copier le code
import { DndProvider } from '@/components/common/dashboardComponent/assistant/providers/dnd-provider'
🧪 Qualité du code
ESLint + TypeScript ESLint + plugins React / Import

Prettier intégré (formatting auto)

Organisation des composants par domaines (features/auth, features/chat, features/assistant, etc.)

Conventional Commits (feat:, fix:, chore:...)

📝 Conventions
Nom de fichiers : NomComposant.variant.tsx ou context.feature.ts

Imports triés automatiquement (ESLint + Prettier)

Types centralisés dans src/types avec export dans index.ts