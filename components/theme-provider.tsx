"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { Theme as RadixThemesProvider} from "@radix-ui/themes"
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
            <RadixThemesProvider>
              {children}
            </RadixThemesProvider>
         </NextThemesProvider>
}
