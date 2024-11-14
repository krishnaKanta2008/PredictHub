import Page from "@/components/Dashboard/Dashboard"
import   AppHeader   from "@/components/Sidebar/app-header"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { fetchStockData } from "@/app/actions"
import { useCallback, useState } from "react"

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
        <SidebarInset>
          <AppHeader ticker={ticker} setTicker={setTicker} fetchData={fetchData} loading={loading} />
          <div className="bg-stone-900">
            <Page data={data} loading={loading} ticker={ticker} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
export default Home
