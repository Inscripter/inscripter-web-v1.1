import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { Progress } from "@/components/ui/progress"
import { SvgImages } from "@/components/svgImages"
import { Underline } from "lucide-react"
import { InscribeKuro } from "@/components/inscribeKuro"



async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/inscripter/inscripter",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()
  let totalSupply = 21000000000
  let totalMinted = 0
  const progressRatio = totalMinted / totalSupply * 100;

  return (
    <><section id="landing">
      <InscribeKuro progressRatio={progressRatio} totalSupply={totalSupply} totalMinted={totalMinted}/>
      </section>
      <section id="krodinals" className="container py-8 md:py-12 lg:py-24 h-full">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-proto-mono text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Krodinals
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Comming Soon ...
          </p>

        </div>
      </section>
    </>
  )
}
