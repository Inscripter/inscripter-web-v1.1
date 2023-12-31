"use client"

import { useEffect, useState } from "react"
import { landingConfig } from "@/config/landing"
import { useAccount } from 'wagmi';

import { buttonVariants } from "@/components/ui/button"
import { ConnectButton } from "@/components/ui/wallet-connect-btn" 
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { AlignJustify } from "lucide-react"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({
  children,
}: LandingLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [balance, setBalance] = useState(0);
  const { address, isConnected } = useAccount()
  console.log("type of address : ", typeof address);

  useEffect(() => { 
    setIsMobile(window.innerWidth <= 640);
    setHasMounted(true);
    if ( address && isConnected) {
      console.log("fetching balance")
      const res = fetch(`/api/getKroBalance?walletAddress=${address}`)
        .then(res => res.json())
        .then(data => setBalance(data.balance))
        .catch(console.error);
        console.log("balance : ", balance);
        console.log("address : ", address);
    }
  }, [address, isConnected]);

  if (!hasMounted) {
    return null;
  }


  return (
    <div className="flex w-full min-h-screen flex-col">
      <header className="container flex-col fixed bg-gradient-to-b from-black to-transparent opacity-90 overflow-x-scroll scrollbar-hide">
        <div className="flex sm:h-20 lg:h-12 items-center justify-between py-6">
          <MainNav items={landingConfig.mainNav} />
        </div>
      </header>
      <div className={
        isMobile? "scale-[0.9] fixed right-0 flex-col sm:h-20 lg:h-12 items-end justify-end py-4 mr-2" :
                  "scale-[1] fixed right-0 flex-col sm:h-20 lg:h-12 items-end justify-end py-2 mr-4"}>
        <ConnectButton/>
        {isMobile? "" : <div className="w-3"></div>}
        <div className="flex justify-end mr-4">
       {isConnected && <div> {balance} KRO</div>}
      </div>
      </div>

      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}