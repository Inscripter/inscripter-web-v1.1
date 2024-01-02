'use client'

import * as React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { Progress } from "@/components/ui/progress"
import { SvgImages } from "@/components/svgImages"
import { Underline } from "lucide-react"
import { InscribeKuro } from "@/components/inscribeKuro"
import { Insactions } from "@/components/insactions"

async function getTotalMintAmt() {
  try {
    const res = await fetch('/api/totalMintAmt');
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const { data } = await res.json();
    return data[0]?.totalMintAmt || 0;
  } catch (error) {
    return 0;
  }
}

export default function IndexPage() {
  const [totalMintAmt, setTotalMintAmt] = React.useState(0);
  let maxSupply = 21000000000;
  const progressRatio = totalMintAmt / maxSupply * 100;

  React.useEffect(() => {
    getTotalMintAmt().then(setTotalMintAmt);
  }, []);

  return (
    <>
      <section id="landing">
        <InscribeKuro progressRatio={progressRatio} maxSupply={maxSupply} totalMintAmt={totalMintAmt}/>
      </section>
      <section id="insactions" className="container py-8 md:py-12 lg:py-24 h-full">
        <Insactions/>
      </section>
    </>
  );
}