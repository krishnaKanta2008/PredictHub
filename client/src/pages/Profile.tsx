import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileComponent from "@/components/Profile/ProfileComponent";

const Profile = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col h-screen overflow-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 fixed top-0 z-10 bg-opacity-90 backdrop-blur-sm ml-[2px] w-full">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="" />
                        <Separator orientation="vertical" className="h-6" />
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-5 mt-20">
                    <ProfileComponent />
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Profile