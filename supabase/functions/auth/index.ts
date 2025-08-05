import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
        if (path === 'signup') {
          const { email, password } = await req.json();
          
          const { data, error } = await supabaseClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true
          });

          if (error) {
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          // Create user profile
          const { error: profileError } = await supabaseClient
            .from('users')
            .insert({
              id: data.user.id,
              platform_auth_id: data.user.id,
              username: email.split('@')[0],
              created_at: new Date().toISOString()
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }

          return new Response(
            JSON.stringify({ user: data.user }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (path === 'signin') {
          const { email, password } = await req.json();
          
          const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
          });

          if (error) {
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ user: data.user, session: data.session }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (path === 'signout') {
          const authHeader = req.headers.get('Authorization');
          if (!authHeader) {
            return new Response(
              JSON.stringify({ error: 'No authorization header' }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const { error } = await supabaseClient.auth.admin.signOut(authHeader.replace('Bearer ', ''));

          if (error) {
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
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

          const { data: { user }, error } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''));

          if (error) {
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          // Get user profile
          const { data: profile } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

          return new Response(
            JSON.stringify({ user, profile }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
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