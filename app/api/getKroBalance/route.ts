import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  let walletAddress = url.searchParams.get('walletAddress');
  if (!walletAddress) {
    return NextResponse.json({
      statusCode: 400,
      message: 'Missing request body'
    });
    
  }

  const { data, error } = await supabase
    .from('balance')
    .select('bal')
    .eq('walletAddress', walletAddress)
    .order('blockNumber', { ascending: false })
    .order('txNumber', { ascending: false })
    .limit(1);

  if (error) {
    return NextResponse.json({
      statusCode: 500,
      message: 'An error occurred while retrieving balance'
    });
  }

  // Check if data is not empty and extract the balance
  const balance = data && data.length > 0 ? data[0].bal : 0;

  return NextResponse.json({
    statusCode: 200,
    message: '200 OK',
    balance: balance
  });
}