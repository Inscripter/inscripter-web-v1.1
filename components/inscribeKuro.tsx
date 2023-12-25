'use client';

import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { Callout } from "./callout";
import { env } from "@/env.mjs"

import React, { ChangeEvent, use, useCallback, useEffect, useState } from 'react';
import {
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
  useChainId,
} from 'wagmi';

import { SvgImages } from "@/components/svgImages" // Update with correct path
import { Progress } from "@/components/ui/progress" // Update with correct path
import { siteConfig } from "@/config/site" // Update with the correct path if needed

const InscribeKuro = ({ progressRatio, totalMinted, totalSupply }) => {
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
  const { isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });
  const chainId = useChainId();
  const account = useAccount();

  const [mintAmount, setMintAmount] = useState('1000');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth <= 640) });

  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [scribeMessage, setScribeMessage] = useState('');
  const [isScribing, setIsScribing] = useState(false);

  const handleMintAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 4) {
      setMintAmount(newValue);
    }

    const value = Number(newValue);
    const isInvalid = isNaN(value) || value > 1000 || value === 0 || newValue.startsWith('0') || newValue.includes('.');
    setIsInvalidInput(isInvalid);

  }, []);

  useEffect(() => {
    const value = Number(mintAmount);
    const isInvalid = isNaN(value) || value > 1000 || value === 0 || mintAmount.startsWith('0') || mintAmount.includes('.');
    setIsInvalidInput(isInvalid);

  }, [mintAmount]);

  const fixedScribeInput = `data:,{"p":"krc-20","op":"mint","tick":"kro","amt":"${mintAmount}"}`;

  const onScribe = useCallback(async () => {
    if (!account || !account.isConnected || !account.address) {
      alert('You must connect your wallet to scribe.');
      return;
    }

    setIsScribing(true);

    try {
      // Send the transaction
      await sendTransaction({
        to: account.address,
        data: `0x${Buffer.from(fixedScribeInput).toString('hex')}`,
      });
  
      // Set a message indicating the transaction is in progress
      // Note: You'll need to rely on another method to track the actual transaction status
      setScribeMessage('Transaction in progress...');
    } catch (e) {
      setScribeMessage(`Error: ${(e as Error).message}`);
    } finally {
      setIsScribing(false);
    }
  }, [account, mintAmount, sendTransaction, fixedScribeInput]);

  useEffect(() => {
    if (!data?.hash) return;
    // Other logic related to transaction completion
    console.log('Transaction hash:', data.hash);
  }, [data, chainId]);

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col items-center gap-4 w-full">
        <div
          className="rounded-2xl bg-muted mt-20 px-4 py-1.5 text-sm font-medium"
        >
          = FREE MINT =
        </div>

          <SvgImages.kuroCat/>

        {/* Removed comment for brevity */}
        <h1 className="text-scale-down text-center font-proto-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          INSCRIBE TO MINT <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ color: '#45D620' }}>$KRO</a>
        </h1>
        <p className="text-scale-down text-center max-w-[42rem] leading-normal text-muted-foreground text-2xl sm:leading-8">
          GET First Inscription Token on <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ color: '#45D620' }}>Kroma</a>
        </p>
        


        <Progress value={progressRatio}/>
        <p className="w-full text-right sm:text-sm lg:text-sm">
          <span style={{ color: '#45d620' }}>{totalMinted}</span> of 
          <span>{isMobile ? ' 21M' : ' '+totalSupply+'KRO has been minted.'}</span> 
        </p>

        <div className="w-full">
          <Input
            value={fixedScribeInput}
            readOnly
            style={{height: "20%"}}
          />
        
        
        <div className="box-label mt-3">Mint Amount ( Maximum: 1000 )</div>

      <input
        className={isInvalidInput ? "mint-invalid-input" : "mint-amount-input"}
        type="number"
        value={mintAmount}
        onChange={handleMintAmountChange}
        min="1"
        max="1000" // Set the max value to 9999 for 4 digits
        style={{ wordWrap: "break-word" }}
      />

          </div>
          <button className={cn(buttonVariants({ size: "lg" }))}
                  type="button"
                  onClick={onScribe}>
                  MINT
          </button>
      </div>
    </section>
  );
};

export { InscribeKuro };
