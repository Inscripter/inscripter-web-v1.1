"use client"

import Link from "next/link"

import { landingConfig } from "@/config/landing"
import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { ConnectButton } from "@/components/ui/wallet-connect-btn" 
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({
  children,
}: LandingLayoutProps) {
  return (
    
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background fixed bg-gradient-to-b from-black to-transparent opacity-90 overflow-x-scroll scrollbar-hide">
        <div className="flex h-12 items-center justify-between py-6 ">
          <MainNav items={landingConfig.mainNav} />
          <nav>
            <div className="text-black">
            <ConnectButton/>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
