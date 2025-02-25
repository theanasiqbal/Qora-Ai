import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qora.ai",
  description: "AI Assistants for making your work faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "h-screen flex flex-col antialiased dark text-foreground bg-background"
        )}
      >
        <Providers>
          <AppBar />
          <main className="flex-1  flex flex-col dark text-foreground bg-background h-[95vh]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
