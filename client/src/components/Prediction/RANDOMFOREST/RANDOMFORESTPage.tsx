import { Card } from "@/components/ui/card"
import RANDOMFORESTStockAnalysis from "./RANDOMFORESTStockAnalysis"

const RANDOMFORESTPage = () => {
  return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3">
              {/* Main content area */}
              <Card className="p-6 md:col-span-2">
                  <div className="w-full h-[300px] flex items-center justify-center text-muted-foreground">
                      Main Content Area
                  </div>
              </Card>

              {/* Right sidebar stack */}
              <div className="grid gap-4 md:gap-6 lg:gap-8">
                  <Card className="p-6">
                      <div className="w-full h-[140px] flex items-center justify-center text-muted-foreground">
                          Top Right Section
                      </div>
                  </Card>
                  <Card className="p-6">
                      <div className="w-full h-[140px] flex items-center justify-center text-muted-foreground">
                          Bottom Right Section
                      </div>
                  </Card>
              </div>

              {/* Full width bottom section */}
              <Card className="p-6 md:col-span-3">
                  <div className="w-full flex  text-muted-foreground">
                      <RANDOMFORESTStockAnalysis />
                  </div>
              </Card>
          </div>
      </div>
  )
}

export default RANDOMFORESTPage