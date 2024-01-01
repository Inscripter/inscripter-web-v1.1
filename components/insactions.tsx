'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Section, ScrollArea } from '@radix-ui/themes'; // replace with your actual table library
// import { checkCircle, xCircle, pendingCircle } from '@/components/icons';
import { NextResponse } from 'next/server'

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

// ...

const Insactions = () => {
  const [insactions, setInsactions] = useState<Insaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // Add state for current page
  const [totalPages, setTotalPages] = useState(0);

  type InsactionResponse = {
    statusCode:number;
    data : Insaction[];
    totalPages: number;
    message: string;
  }


  const init = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/data?page=${page}`);
    console.log("type of page : ", typeof page);
    console.log("start loading page : ", page);
    console.log("res : ", res);
    if (!res.ok) {
      console.error('Error fetching data:', res.status);
      // Handle the error here, maybe set a state to show an error message to the user
      return;
    }
    const { statusCode, data, totalPages }: InsactionResponse = await res.json();
    if (statusCode === 200) {
      setInsactions(data);
      setIsLoading(false);
      setTotalPages(totalPages);
    }
  }
  useEffect(() => {
    init();
  }, [page]);
  
  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="w-full font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Insactions
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Loading ...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl flex justify-center">
        Insactions
      </h2>
      <div className="container w-full flex mt-9 gap-2 justify-center">
      <Button className="bg-white text-black" onClick={() => setPage(1)}>First</Button>
      <Button className="bg-white text-black" disabled={page <= 0} onClick={() => setPage(Math.max(0, page - 1))}>{'<'}</Button>
      <Button className="bg-white text-black aria-disabled)">{page + 1} of {totalPages + 1}</Button>
      <Button className="bg-white text-black" disabled={page >= totalPages} onClick={() => setPage(Math.min(page + 1, totalPages))}>{'>'}</Button>
      <Button className="bg-white text-black" onClick={() => setPage(totalPages)}>last</Button>

      </div>
      <ScrollArea scrollbars='horizontal'>
      <Table.Root className="mt-6">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-center">Tx</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">Network</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">Block</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">From</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">To</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">Tick</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell className="text-center">Operator</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center">Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center nowrap">Age</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-center nowrap">status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {insactions.map((insaction) => (
            <Table.Row key={insaction.hash}>
              <Table.RowHeaderCell className="text-center text-monkeyYellow">
                <a
                  href={`https://kromascan.com/tx/${insaction.hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {insaction.hash.substring(0, 8)}
                </a>
              </Table.RowHeaderCell>
              <Table.Cell className="text-center">{insaction.network}</Table.Cell>
              <Table.Cell className="text-center">{insaction.blockNumber}</Table.Cell>
              <Table.Cell className="text-center">{insaction.from.substring(0, 8)}</Table.Cell>
              <Table.Cell className="text-center">{insaction.to?.substring(0, 8)}</Table.Cell>
              <Table.Cell className="text-center">{insaction.tick}</Table.Cell>
              <Table.Cell className="text-center">{insaction.op || ""}</Table.Cell>
              <Table.Cell className="text-center">{insaction.amt || ""}</Table.Cell>
              <Table.Cell className="text-center nowrap">{insaction.age}</Table.Cell>
              <Table.Cell className="text-center nowrap text-monkeyGreen">{insaction.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="container w-full flex mt-6 gap-2 justify-center">
      <Button className="bg-white text-black" onClick={() => setPage(1)}>First</Button>
      <Button className="bg-white text-black" onClick={() => setPage(page - 1)}>{'<'}</Button>
      <Button className="bg-white text-black aria-disabled)">{page + 1} of {totalPages + 1}</Button>
      <Button className="bg-white text-black" onClick={() => setPage(page + 1)}>{'>'}</Button>
      <Button className="bg-white text-black" onClick={() => setPage(totalPages)}>last</Button>
      
      </div>
      </ScrollArea>
      </div>
  );
}

export { Insactions };
