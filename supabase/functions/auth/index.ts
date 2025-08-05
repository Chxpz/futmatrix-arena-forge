import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WhopTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface WhopUser {
  id: string;
  email: string;
  username?: string;
}

interface WhopMembership {
  id: string;
  plan_id: string;
  status: string;
  expires_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    switch (req.method) {
      case 'POST':
        if (path === 'whop-exchange') {
          const { code, redirect_uri } = await req.json();
          
          const clientId = Deno.env.get('WHOP_CLIENT_ID');
          const clientSecret = Deno.env.get('WHOP_CLIENT_SECRET');
          
          if (!clientId || !clientSecret) {
            return new Response(
              JSON.stringify({ error: { message: 'Whop credentials not configured' } }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          try {
            // Exchange code for token
            const tokenResponse = await fetch('https://api.whop.com/oauth/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri,
                grant_type: 'authorization_code',
              }),
            });

            if (!tokenResponse.ok) {
              throw new Error('Failed to exchange code for token');
            }

            const tokenData: WhopTokenData = await tokenResponse.json();
            
            // Get user info
            const userResponse = await fetch('https://api.whop.com/api/v2/me', {
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
              },
            });

            if (!userResponse.ok) {
              throw new Error('Failed to get user info');
            }

            const userData: WhopUser = await userResponse.json();

            // Get memberships
            const membershipsResponse = await fetch('https://api.whop.com/api/v2/me/memberships', {
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
              },
            });

            let memberships: WhopMembership[] = [];
            if (membershipsResponse.ok) {
              const membershipsData = await membershipsResponse.json();
              memberships = membershipsData.data || [];
            }

            // Create or update user in our database
            const { error: upsertError } = await supabaseClient
              .from('users')
              .upsert({
                id: userData.id,
                platform_auth_id: userData.id,
                username: userData.username || userData.email?.split('@')[0] || userData.id,
                whop_user_id: userData.id,
                subscription_status: memberships.some(m => m.status === 'active') ? 'active' : 'inactive',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });

            if (upsertError) {
              console.error('Error upserting user:', upsertError);
            }

            return new Response(
              JSON.stringify({ 
                token: tokenData.access_token,
                user: userData,
                memberships 
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          } catch (error) {
            console.error('Whop exchange error:', error);
            return new Response(
              JSON.stringify({ error: { message: error.message } }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        if (path === 'whop-verify') {
          const { token } = await req.json();
          
          try {
            // Verify token with Whop
            const userResponse = await fetch('https://api.whop.com/api/v2/me', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!userResponse.ok) {
              throw new Error('Invalid token');
            }

            const userData: WhopUser = await userResponse.json();

            // Get memberships
            const membershipsResponse = await fetch('https://api.whop.com/api/v2/me/memberships', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            let memberships: WhopMembership[] = [];
            if (membershipsResponse.ok) {
              const membershipsData = await membershipsResponse.json();
              memberships = membershipsData.data || [];
            }

            return new Response(
              JSON.stringify({ 
                token,
                user: userData,
                memberships 
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          } catch (error) {
            return new Response(
              JSON.stringify({ error: { message: 'Invalid token' } }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
        break;

      case 'GET':
        if (path === 'user') {
          const authHeader = req.headers.get('Authorization');
          if (!authHeader) {
            return new Response(
              JSON.stringify({ error: 'No authorization header' }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const token = authHeader.replace('Bearer ', '');
          
          try {
            // Verify token with Whop
            const userResponse = await fetch('https://api.whop.com/api/v2/me', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!userResponse.ok) {
              throw new Error('Invalid token');
            }

            const userData: WhopUser = await userResponse.json();

            // Get user profile from our database
            const { data: profile } = await supabaseClient
              .from('users')
              .select('*')
              .eq('whop_user_id', userData.id)
              .single();

            return new Response(
              JSON.stringify({ 
                user: {
                  id: userData.id,
                  email: userData.email,
                  username: userData.username,
                  ...profile
                }
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          } catch (error) {
            return new Response(
              JSON.stringify({ error: 'Invalid token' }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
        break;
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Auth function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});