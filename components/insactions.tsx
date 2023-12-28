'use client';

import { useEffect, useState } from 'react';
import { Table } from '@radix-ui/themes'; // replace with your actual table library

import { ethers } from "ethers";
import {NextResponse} from "next/server";
const provider = new ethers.JsonRpcProvider('https://api.kroma.network');

type Insaction = {
  id:number;
  blockNumber: number | null;
  hash: string;
  from: string;
  to: string | null;
  value: string;
  data: string;  // Rename 'input' to 'data'
};

// ...

const Insactions = () => {
  const [insactions, setInsactions] = useState<Insaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log('insactions collecting');

  type InsactionResponse = {
    statusCode:number;
    data : Insaction[];
  }
  const init = async () => {
    const res = await fetch('/api/data');
    const {statusCode, data} : InsactionResponse = await res.json();
    console.log(data)
    if(statusCode === 200) {
      setInsactions(data)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    init();
  //   console.log('fetch')
  //   fetch('/api/data', {headers : { 'Content-Type': 'application/json'}})
  //     .then(  (response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  // console.log(response.body)
  //       return NextResponse.json();
  //     })
  //     .then(data => {
  //       setInsactions(data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data: ', error);
  //     });
  }, []);

  if (isLoading) {

    return <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Insactions
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Loading ...
          </p></div>;
  }

  return (
    <div>
      <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Insactions
      </h2>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Block Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Hash</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>From</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>To</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Data</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {insactions.map((insaction) => (
            <Table.Row key={insaction.id}>
              <Table.RowHeaderCell>{insaction.blockNumber}</Table.RowHeaderCell>
              <Table.Cell>{insaction.hash}</Table.Cell>
              <Table.Cell>{insaction.from}</Table.Cell>
              <Table.Cell>{insaction.to}</Table.Cell>
              <Table.Cell>{insaction.value}</Table.Cell>
              <Table.Cell>{insaction.data}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export { Insactions };
