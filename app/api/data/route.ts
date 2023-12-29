import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs";
import { ethers } from "ethers";
import { formatDistanceToNow } from 'date-fns';

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const provider = new ethers.JsonRpcProvider('https://api.kroma.network');
const BLOCK_TIME_IN_SECONDS = 2;

const calculateAge = async (blockNumber: number) => {
  const currentBlockNumber = await provider.getBlockNumber();
  const ageInSeconds = (currentBlockNumber - blockNumber) * BLOCK_TIME_IN_SECONDS;
  const ageDate = new Date(Date.now() - ageInSeconds * 1000);
  return formatDistanceToNow(ageDate, { addSuffix: true });
};

type Insaction = {
  id:number;
  blockNumber: number;
  txNumber: number | null;
  hash: string;
  from: string;
  to: string | null;
  tick: string;
  value: string;
  data: string;
  op: string;
  network: string;
  amt: number;
  age: string;
  status: string;
};

type ResponseData = {
  statusCode:number;
  data? : Insaction[];
  totalPages?: number;
  message: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const page = Number(req.json) || 0;
  const pageSize = 20;

  // Get total row count
  const { count: totalRows, error: countError } = await supabase
    .from('insactions-v0.0.1')
    .select('', { count: 'exact' });

  if (countError) {
    return NextResponse.json({
      statusCode: 500,
      message: countError.message
    });
  }

  const { data, error } = await supabase
    .from('insactions-v0.0.1')
    .select('*')
    .range(page * pageSize, (page + 1) * pageSize - 1)
    .order('blockNumber', { ascending: false })
    .order('txNumber', { ascending: false });

  if (error) {
    return NextResponse.json({
      statusCode: 500,
      message: error.message
    });
  }

  const dataWithAge = await Promise.all(data.map(async item => {
    const age = await calculateAge(item.blockNumber);
    return { ...item, age };
  }));

  if (totalRows === null) {
    return NextResponse.json({
      statusCode: 500,
      message: "Failed to get total row count"
    });
  }

  const totalPages = Math.ceil(totalRows / pageSize);

  return NextResponse.json({
    statusCode: 200,
    data: dataWithAge,
    totalPages,
    message: "200 OK"
  });
}