import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import './dashboard.css'


export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
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
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </KBar>
  );
}
