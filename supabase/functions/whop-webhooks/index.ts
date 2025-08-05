import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-whop-signature',
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

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const whopSignature = req.headers.get('x-whop-signature');
    if (!whopSignature) {
      return new Response(
        JSON.stringify({ error: 'Missing Whop signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Verify Whop webhook signature
    // const isValid = verifyWhopSignature(body, whopSignature);
    // if (!isValid) {
    //   return new Response(
    //     JSON.stringify({ error: 'Invalid signature' }),
    //     { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   );
    // }

    const webhookData = await req.json();
    console.log('Whop webhook received:', webhookData);

    // Handle different webhook events
    switch (webhookData.event) {
      case 'membership_went_valid':
        await handleMembershipValid(supabaseClient, webhookData.data);
        break;
      
      case 'membership_went_invalid':
        await handleMembershipInvalid(supabaseClient, webhookData.data);
        break;
      
      case 'payment_succeeded':
        await handlePaymentSucceeded(supabaseClient, webhookData.data);
        break;
      
      default:
        console.log('Unhandled webhook event:', webhookData.event);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Whop webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleMembershipValid(supabase: any, data: any) {
  console.log('Membership went valid:', data);
  
  // Update or create user with Whop membership
  const { error } = await supabase
    .from('users')
    .upsert({
      whop_id: data.user_id,
      subscription_status: 'active',
      discord_id: data.discord_id,
      username: data.username || `User${data.user_id.slice(-8)}`
    }, {
      onConflict: 'whop_id'
    });

  if (error) {
    console.error('Error updating user membership:', error);
    throw error;
  }

  // Create user plan record
  const { error: planError } = await supabase
    .from('user_plans')
    .insert({
      user_id: data.user_id,
      plan: data.plan_name || 'basic',
      started_at: new Date().toISOString(),
      source: 'whop'
    });

  if (planError) {
    console.error('Error creating user plan:', planError);
  }
}

async function handleMembershipInvalid(supabase: any, data: any) {
  console.log('Membership went invalid:', data);
  
  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'inactive'
    })
    .eq('whop_id', data.user_id);

  if (error) {
    console.error('Error updating user membership status:', error);
    throw error;
  }

  // End current plan
  const { error: planError } = await supabase
    .from('user_plans')
    .update({
      ended_at: new Date().toISOString()
    })
    .eq('user_id', data.user_id)
    .is('ended_at', null);

  if (planError) {
    console.error('Error ending user plan:', planError);
  }
}

async function handlePaymentSucceeded(supabase: any, data: any) {
  console.log('Payment succeeded:', data);
  
  // Log payment for analytics/tracking
  // Could extend schema to include payments table if needed
}