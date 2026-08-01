# OFAC — Site dynamique + Espace admin

Site vitrine de **ONCE FOR ALL COMPANY SARL** (recyclage plastique → pavés écologiques, Bukavu, RDC).
Next.js 16 (App Router) + Supabase (base de données, stockage d'images, authentification).

## 🚀 Démarrage

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer Supabase** — créez un projet sur [supabase.com](https://supabase.com), puis :
   - *SQL Editor* → exécutez le contenu de [`supabase/schema.sql`](supabase/schema.sql)
   - *Authentication → Users* → créez le compte admin de l'équipe (email + mot de passe)
   - *Project Settings → API* → copiez les clés dans `.env.local` :
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     SUPABASE_SERVICE_ROLE_KEY=...
     ```

3. **Lancer en développement**
   ```bash
   npm run dev
   ```
   - Site public : http://localhost:3000
   - Espace admin : http://localhost:3000/admin

> 💡 Sans clés Supabase, le site public s'affiche quand même avec le contenu par défaut,
> et le formulaire bascule automatiquement sur l'envoi WhatsApp.

## 🗂️ Structure

| Chemin | Rôle |
|--------|------|
| `app/page.tsx` | Site public (une page, bilingue FR/EN) |
| `app/actualites/[slug]` | Page d'un article |
| `app/admin` | Espace d'administration (protégé) |
| `app/actions/contact.ts` | Enregistrement des messages du formulaire |
| `lib/content.ts` | Récupération du contenu (Supabase + valeurs par défaut) |
| `lib/supabase/*` | Clients Supabase (navigateur / serveur / service) |
| `supabase/schema.sql` | Schéma de la base de données |

## 🔐 Espace admin — modules

- **Messages** — boîte de réception du formulaire de contact
- **Actualités / Blog** — créer, publier, modifier des articles bilingues
- **Galerie** — ajouter / supprimer les photos du terrain
- **Partenaires** — gérer logos et noms
- **Images & chiffres** — remplacer logo/images de sections, éditer les chiffres d'impact

## 🌐 Déploiement (Vercel)

1. Poussez le projet sur GitHub.
2. Importez le repo dans [vercel.com](https://vercel.com).
3. Ajoutez les 3 variables d'environnement Supabase dans les *Project Settings*.
4. Déployez. Remplacez ensuite le domaine `www.ofac-rdc.com` dans `app/layout.tsx` par le vrai domaine.
