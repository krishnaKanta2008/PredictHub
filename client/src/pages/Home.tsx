import Dashboard from "@/components/Dashboard/Dashboard"
import AppHeader from "@/components/Sidebar/app-header"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { fetchStockData } from "@/app/actions"
import { useCallback, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

const Home = () => {
  const [ticker, setTicker] = useState("GOOGL");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (searchTicker: string) => {
    setLoading(true);
    try {
      const result = await fetchStockData(searchTicker);
      setData(result);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarInset>
        </SidebarInset> */}
        <div className="overflow-hidden relative">
          
            <AppHeader ticker={ticker} setTicker={setTicker} fetchData={fetchData} loading={loading} />
          
          <ScrollArea className="h-[calc(100vh-4rem)] px-2 md:px-4 py-4 md:py-6">
            <Dashboard data={data} loading={loading} ticker={ticker} />
          </ScrollArea>
          
        </div>

      </SidebarProvider>
    </>
  )
}
export default Home
