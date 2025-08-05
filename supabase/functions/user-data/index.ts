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

    // Verify auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const path = url.pathname.split('/').slice(-2); // Get last two segments
    const endpoint = path[0];
    const action = path[1];

    switch (req.method) {
      case 'GET':
        if (endpoint === 'stats') {
          const { data: stats, error } = await supabaseClient
            .from('user_stats_summary')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            throw error;
          }

          return new Response(
            JSON.stringify({ stats: stats || null }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (endpoint === 'matches') {
          const limit = url.searchParams.get('limit') || '10';
          const { data: matches, error } = await supabaseClient
            .from('matches')
            .select('*')
            .eq('user_id', user.id)
            .order('timestamp', { ascending: false })
            .limit(parseInt(limit));

          if (error) throw error;

          return new Response(
            JSON.stringify({ matches }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (endpoint === 'training-plans') {
          const { data: plans, error } = await supabaseClient
            .from('training_plans')
            .select('*')
            .eq('user_id', user.id)
            .order('start_date', { ascending: false });

          if (error) throw error;

          return new Response(
            JSON.stringify({ plans }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (endpoint === 'profile') {
          const { data: profile, error } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          return new Response(
            JSON.stringify({ profile }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        break;

      case 'POST':
        if (endpoint === 'matches') {
          const matchData = await req.json();
          
          const { data: match, error } = await supabaseClient
            .from('matches')
            .insert({
              ...matchData,
              user_id: user.id,
              timestamp: new Date().toISOString()
            })
            .select()
            .single();

          if (error) throw error;

          return new Response(
            JSON.stringify({ match }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (endpoint === 'training-plans') {
          const planData = await req.json();
          
          const { data: plan, error } = await supabaseClient
            .from('training_plans')
            .insert({
              ...planData,
              user_id: user.id
            })
            .select()
            .single();

          if (error) throw error;

          return new Response(
            JSON.stringify({ plan }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        break;

      case 'PUT':
        if (endpoint === 'profile') {
          const updates = await req.json();
          
          const { data: profile, error } = await supabaseClient
            .from('users')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          return new Response(
            JSON.stringify({ profile }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        break;
    }

    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('User data function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});