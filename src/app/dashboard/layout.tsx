import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import './dashboard.css'
import AIAssistant from "@/components/AI-Assistant";


export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME}.ai`,
  description: "AI Assistants for making your work faster.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // // Persisting the sidebar state in the cookie.
  // const cookieStore = await cookies();
  const defaultOpen = true;
  return (
    <KBar>
      <ThemeProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <main className="flex overflow-hidden">
            <div className="w-[15vw] ">
              <AppSidebar />
            </div>
            <div className="w-[85vw] ">
              <SidebarInset>
                <Header />
                {children}
              </SidebarInset>
            </div>
            <div className="absolute bottom-5 right-5">
              <AIAssistant />
            </div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </KBar>
  );
}
