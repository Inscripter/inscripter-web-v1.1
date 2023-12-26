'use client';

import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Box, Section, Container, Text, ScrollArea, Button, Flex, Dialog, TextField} from "@radix-ui/themes"
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

import { SvgImages } from "@/components/svgImages"
import { Progress } from "@/components/ui/progress"
import { siteConfig } from "@/config/site"

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
    <Box className="space-y-6 pb-8 pt-8 md:pb-12 sm:pt-4 lg:py-4">
      <Section>
      <div className="container flex flex-col items-center gap-4 w-full">
        <div className="rounded-2xl bg-muted mt-20 flex px-4 py-1.5 text-lg font-medium">
            FREE MINT <div style={{ color: '#45D620' }}>&nbsp;$KRO</div>
        </div>

          <SvgImages.kuroCat/>

        {/* Removed comment for brevity */}
        <h1 className="text-scale-down text-center font-proto-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl">GET First Inscription Token</h1>
        <p className="text-scale-down text-center max-w-[42rem] leading-normal text-muted-foreground text-2xl sm:leading-8">on <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ color: '#45D620' }}>Kroma Network</a></p>
        <Progress value={progressRatio}/>
        <p className="w-full text-right sm:text-sm lg:text-sm">
          <span style={{ color: '#45d620' }}>{totalMinted}</span> of 
          <span>{isMobile ? ' 21M MINTED' : ' '+totalSupply+' KRO minted.'}</span> 
        </p>
        </div>
      <div>
      <Container className="container flex flex-col items-center gap-4 w-1/2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="mt-6">
        <Text as="label" size="6" >Input Data For Mint</Text>
        </div> 
        <Input 
          value={fixedScribeInput} 
          readOnly 
          style={{
            height: "45px",
            textAlign:"center",
            borderColor:"white",
            wordWrap: "break-word"}}/>
        
        <div className="mt-6">
        <Text as="label" size="6">Mint Amount ( Max: 1000 )</Text>
        </div>
        <Input
          type="number"
          value={mintAmount}
          onChange={handleMintAmountChange}
          min="1"
          max="1000" // Set the max value to 9999 for 4 digits
          style={{
            height: "45px",
            textAlign:"center",
            color: isInvalidInput ? 'red' : 'white',
            borderColor: isInvalidInput ? 'red' : 'white',
            // backgroundColor: isInvalidInput ? '#ffe6e6' : 'transparent',
            wordWrap: "break-word"
          }}
        />

      <div className="flex flex-col items-center gap-4">
      <Dialog.Root>
        <Dialog.Trigger>
            <Button
                  type="button"
                  size="4"
                  onClick={onScribe}
                  style={{
                    marginTop: '24px',
                    opacity: isInvalidInput ? 0.5 : 1,
                    pointerEvents: isInvalidInput ? 'none' : 'auto',
                    backgroundColor: isInvalidInput ? '#ccc' : 'white',
                    color: isInvalidInput ? '#666' : 'black',
                    border: isInvalidInput ? 'none' : '1px solid var(--color-input)',
                    cursor: isInvalidInput ? 'not-allowed' : 'pointer',
                    ...(isInvalidInput ? {} : { ':hover': { backgroundColor: 'var(--color-primary/90)' } }),
                  }}
                >
              MINT
            </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue="Freja Johnsen"
                placeholder="Enter your full name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                defaultValue="freja@example.com"
                placeholder="Enter your email"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      </div>

      </Container>
      </div>
      </Section>
    </Box>
  );
};

export { InscribeKuro };
