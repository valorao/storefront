import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google"
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import NavMenu from "@/components/NavMenu";
import SessionProvider from "../components/SessionProvider"

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "valorao",
  description: "valorao",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}><SessionProvider session={session}>
          <main className="md:mb-0 mb-16">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavMenu />
              {children}
            </ThemeProvider>
          </main>
        </SessionProvider>
      </body>
    </html >
  );
}
