import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
  .from('balance')
  .select('totalMintAmt')
  .eq('network', 'kroma')
  .eq('p', 'krc-20')
  .eq('tick', 'kro')
  .order('blockNumber', { ascending: false })
  .order('txNumber', { ascending: false })
  .limit(1);

  if (error) {
    return NextResponse.json({
      statusCode: 500,
      message: error.message
    });
  }

  return NextResponse.json({
    statusCode: 200,
    data,
    message: "200 OK"
  });
}