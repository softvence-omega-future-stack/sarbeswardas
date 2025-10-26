import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ContentPage from "@/components/ContentPage";
import Dropdown from "@/components/Dropdown";
import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function Layout() {
  return (
    <ProtectedDashboard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header
            className="flex bg-sidebar border-b dark:bg-card h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear 
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
          >
            <div className="flex w-full justify-between items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Dropdown />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <ContentPage />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedDashboard>
  );
}
