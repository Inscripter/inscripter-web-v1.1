import Link from 'next/link';
import { SvgImages } from "@/components/svgImages" // Update with correct path
import { Progress } from "@/components/ui/progress" // Update with correct path
import { cn } from "@/lib/utils" // Assuming cn is a utility function for classnames
import { siteConfig } from "@/config/site" // Update with the correct path if needed

const InscribeKuro = ({ value, totalMinted, totalSupply }) => {
  // You can pass value, totalMinted, totalSupply as props or fetch them inside this component

  const buttonVariants = (/* parameters */) => {
    // Define or import your buttonVariants function
  };

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col items-center gap-4 w-full">
        <Link
          href={siteConfig.links.twitter}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          = FREE GIFT FOR PROMO =
        </Link>
        <SvgImages.kuroCat/>
        
        {/* Removed comment for brevity */}
        <h1 className="text-center font-proto-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          INSCRIBE TO MINT <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ color: '#45D620' }}>$KRO</a>
        </h1>
        <p className="text-center max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Get First Inscription Token on <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ color: '#45D620' }}>Kroma</a>
        </p>
        <Progress value={value}/>
        <p className="w-full text-right sm:text-sm lg:text-sm">
          <span style={{ color: '#45d620' }}>{totalMinted}</span> of {totalSupply} kro has been minted.
        </p>
        <div className="space-x-4">
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InscribeKuro;
