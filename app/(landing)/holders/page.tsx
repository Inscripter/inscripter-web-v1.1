'use client'

import { Table, ScrollArea } from '@radix-ui/themes'; // Replace with your actual table library
import React, { useState, useEffect } from 'react';
import { SvgImages } from "@/components/svgImages"

type Holder = {
  walletaddress: string;
  bal: number;
};

export default function InscriptersPage() {
  const [holders, setInscripters] = useState<Holder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInscripters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/holders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        if (responseData.statusCode === 200) {
          setInscripters(responseData.data);
        } else {
          // Handle other status codes or errors
          console.error('Error fetching holders:', responseData.message);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInscripters();
  }, []);

  if (isLoading) {
    return (
      <section className="container flex flex-col gap-6 py-8 mt-24 md:mt-0 md:max-w-[64rem] md:py-12 lg:py-24">
        <div className="mt-24">     
        <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl flex justify-center">
          holders
        </h2>
        <p className="justify-center text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Loading ...
        </p>
        </div> 
      </section>
    );
  }

  return (
    <section className="container flex flex-col py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mt-24">
      <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl flex justify-center">
        holders
      </h2>
      <ScrollArea className="mt-6 z-0">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="text-center nowrap">Wallet</Table.ColumnHeaderCell>
              
              <Table.ColumnHeaderCell className="text-center nowrap">Balance</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
                  {holders.map((holder, index) => (
          <Table.Row key={index}>
            <Table.Cell className="text-center text-monkeyYellow">
              <a
                  href={`https://kromascan.com/address/${holder.walletaddress}`}
                  target="_blank"
                  rel="noreferrer"
              >
                  {holder.walletaddress.substring(0, 8)}
              </a>
              
            </Table.Cell>
            <Table.Cell className="text-right flex justify-end mr-2"><div className="flex text-monkeyGreen mr-2">{holder.bal.toLocaleString()}</div><div> ISTA </div> <div className="ml-2"><SvgImages.kroCoinIcon/></div></Table.Cell>
          </Table.Row>
        ))}

          </Table.Body>
        </Table.Root>
      </ScrollArea>
      </div>
      </section>
  );
}
