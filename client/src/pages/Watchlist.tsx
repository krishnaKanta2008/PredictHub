import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import WatchlistCard from "@/components/Watchlist/WatchlistCard";

const Watchlist = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 fixed top-0 z-10 bg-opacity-90 backdrop-blur-sm ml-1 w-full">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="" />
            <Separator orientation="vertical" className="h-6" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 flex">
            <WatchlistCard />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Watchlist