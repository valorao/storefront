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
    <>
      <html lang="pt">
        <body className={cn(
          "max-h-full max-w-full bg-background font-sans antialiased",
          inter.variable
        )}><SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavMenu />
              <div className="md:mt-16 md:mb-15 bg-background" vaul-drawer-wrapper="">
                {children}
              </div>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html >
    </>
  );
}
