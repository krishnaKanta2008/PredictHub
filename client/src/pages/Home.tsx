import Page from "@/components/Dashboard/Dashboard"
import { AppHeader } from "@/components/Sidebar/app-header"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Home = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="bg-stone-900">
              <Page />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
export default Home
