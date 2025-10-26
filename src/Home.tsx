import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/my-components/sidebar/AppSidebar";
import { Outlet } from "react-router";

function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="p-5 border bg-white w-full">
          <SidebarTrigger />
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Home;
