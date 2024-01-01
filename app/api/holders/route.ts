import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export async function GET(req: NextRequest) {
    // Call the stored procedure latest_balance_per_wallet
    const { data, error } = await supabase.rpc('latest_balance_per_wallet');

    console.log("holders/route data: ", data);
    
    if (error) {
        return NextResponse.json({
            statusCode: 500,
            message: error.message
        });
    }

    // Sort the data based on balance in descending order
    data.sort((a, b) => b.bal - a.bal);

    return NextResponse.json({
        statusCode: 200,
        data: data,
        message: "200 OK"
    });
}
