// pages/api/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs"
import {NextResponse} from "next/server";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);


export async function GET() {

  const { data, error } = await supabase
    .from('insactions')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return NextResponse.json({
      statusCode : 500,
      message : error.message
    })
    // return res.status(500).json({ error: error.message });
  }
  return NextResponse.json({
    statusCode:200,
    data
  });
}

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   console.log(env.SUPABASE_URL)
//   console.log('heelo')
//   // const { data, error } = await supabase
//   //   .from('insactions')
//   //   .select('*')
//   //   .order('id', { ascending: false });
//   //
//   // if (error) {
//   //   return res.status(500).json({ error: error.message });
//   // }
//
//   // return res.status(200).json(data);
//   return res.status(200).json({test:'hi'});
// }
