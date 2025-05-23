
# Welcome to your Lovable project - Futmatrix

## Project info

**URL**: https://lovable.dev/projects/d1b94ff4-fb4b-4b38-b956-dd2000b91102

## Authentication Setup

To set up the Google authentication flow for Futmatrix, follow these steps:

### 1. Supabase Configuration

1. **Connect to Supabase**: Click the green Supabase button in the top right of the Lovable interface to connect your project to Supabase.

2. **Create Database Tables**: Run the SQL script found in `supabase/schema.sql` in your Supabase SQL editor to create all necessary tables, triggers, and policies.

3. **Configure Authentication Provider**:
   - Go to your Supabase project dashboard
   - Navigate to Authentication > Providers
   - Enable Google provider
   - Follow Supabase's instructions to set up OAuth credentials in Google Cloud Console
   - Add your Google Client ID and Secret to the Supabase configuration

### 2. Google Cloud Console Setup

1. **Create OAuth credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or use an existing one
   - Navigate to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" as application type
   - Add authorized JavaScript origins:
     - Your local development URL (e.g., `http://localhost:5173`)
     - Your Lovable preview URL
     - Your production URL (if applicable)
   - Add authorized redirect URIs:
     - `https://[YOUR-SUPABASE-PROJECT-URL]/auth/v1/callback`

### 3. Project Environment Variables

Set up the following environment variables in your Supabase project's environment:

```
VITE_SUPABASE_URL=https://[YOUR-SUPABASE-PROJECT-ID].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR-SUPABASE-ANON-KEY]
```

You can add these environment variables through the Supabase integration in Lovable:
1. Click on the green Supabase button
2. Go to "Environment Variables" 
3. Add the variables there

### 4. Implement Supabase Client

Create a Supabase client configuration file at `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 5. Testing Authentication Flow

1. Start your development server
2. Navigate to the signup page
3. Click "Sign up with Google"
4. Complete Google's authentication flow
5. You should be redirected to the dashboard upon successful authentication

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d1b94ff4-fb4b-4b38-b956-dd2000b91102) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d1b94ff4-fb4b-4b38-b956-dd2000b91102) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
