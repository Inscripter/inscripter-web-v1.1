// pages/api/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { env } from "@/env.mjs"
import {NextResponse} from "next/server";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider('https://api.kroma.network');

import { formatDistanceToNow } from 'date-fns';
const BLOCK_TIME_IN_SECONDS = 2;

const calculateAge = async (blockNumber: number) => {
  const currentBlockNumber = await provider.getBlockNumber();
  console.log("currentBlockNumber : ", currentBlockNumber);
  const ageInSeconds = (currentBlockNumber - blockNumber) * BLOCK_TIME_IN_SECONDS;
  const ageDate = new Date(Date.now() - ageInSeconds * 1000);
  return formatDistanceToNow(ageDate, { addSuffix: true });
};

// type ResponseData = {
//   message: string
// }

export async function GET(
  req: NextApiRequest,
) {
  const page = Number(req.query) || 0;
  const pageSize = 20;

  // Get total row count
  const { count: totalRows, error: countError } = await supabase
    .from('insactions-v0.0.1')
    .select('', { count: 'exact' });

  if (countError) {
    return NextResponse.json({
      statusCode : 500,
      message : countError.message
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
      statusCode : 500,
      message : error.message
    });
  }

  // Calculate age for each data item
  const dataWithAge = await Promise.all(data.map(async item => {
    const age = await calculateAge(item.blockNumber);
    return { ...item, age };
  }));

  // Check if totalRows is null
  if (totalRows === null) {
    return NextResponse.json({
      statusCode: 500,
      message: "Failed to get total row count"
    });
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalRows / pageSize);

  return NextResponse.json({
    statusCode:200,
    data: dataWithAge,
    totalPages
  });
}


// req: NextApiRequest,
// res: NextApiResponse<ResponseData>
// ) {
// console.log("request", req.headers);
// const page = Number(req.headers.page) || 1;
// const pageSize = 10; // Set the number of items per page

// const { data, error } = await supabase
//   .from('insactions-v0.0.1')
//   .select('*')
//   .range(page * pageSize, (page + 1) * pageSize - 1) // Select the items for the current page
//   .order('id', { ascending: false });
