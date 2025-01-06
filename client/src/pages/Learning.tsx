import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StockMarketLearning from "@/components/Learning/LearningComponent";
import AppChatBot from "@/components/Chatbot/AppChatBot";

const Watchlist = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 fixed top-0 z-10 bg-opacity-90 backdrop-blur-sm ml-[2px] w-full">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="" />
                        <Separator orientation="vertical" className="h-6" />
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-5 mt-20">
                    <StockMarketLearning />
                </div>
            </SidebarInset>
            <AppChatBot />
        </SidebarProvider>
    )
}

export default Watchlist