'use client'

import { Table, ScrollArea } from '@radix-ui/themes'; // Replace with your actual table library
import React, { useState, useEffect } from 'react';
import { SvgImages } from "@/components/svgImages"

type Holder = {
  walletaddress: string;
  bal: number;
};

export default function HoldersPage() {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHolders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/holders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        if (responseData.statusCode === 200) {
          setHolders(responseData.data);
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

    fetchHolders();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl flex justify-center">
          Holders
        </h2>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl flex justify-center">
        Holders
      </h2>
      <ScrollArea>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="text-center">Wallet Address</Table.ColumnHeaderCell>
              
              <Table.ColumnHeaderCell className="text-center">Balance</Table.ColumnHeaderCell>
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
            <Table.Cell className="text-right flex justify-end mr-2"><div className="flex text-monkeyGreen mr-2">{holder.bal.toLocaleString()}</div><div> KRO </div> <div className="ml-2"><SvgImages.kroCoinIcon/></div></Table.Cell>
          </Table.Row>
        ))}

          </Table.Body>
        </Table.Root>
      </ScrollArea>
      </section>
  );
}
