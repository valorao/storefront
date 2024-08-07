import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google"
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import NavMenu from "@/components/navigation/NavMenu";
import SessionProvider from "@/components/SessionProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
            <SpeedInsights />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
              forcedTheme="dark"
            >
              <NavMenu />
              <div className="md:mt-20 md:mb-15 bg-background" vaul-drawer-wrapper="">
                {children}
              </div>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html >
    </>
  );
}
