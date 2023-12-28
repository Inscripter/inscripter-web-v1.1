// pages/api/data.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs"

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(env.SUPABASE_URL)
  const { data, error } = await supabase
    .from('insactions')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
