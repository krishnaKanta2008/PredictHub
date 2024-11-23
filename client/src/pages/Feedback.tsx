"use client"

import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { FeedbackForm } from "@/components/Feedback/FeedbackForm"
import { Separator } from "@/components/ui/separator"
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"

export default function FeedbackPage() {
    // const handleSubmitFeedback = (rating: number, message: string) => {
    //     console.log("Rating:", rating, "Message:", message)
    //     alert("Thank you for your feedback!")
    // }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-6" />
                        <h1 className="text-xl font-semibold">Feedback</h1>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-md">
                        <FeedbackForm/>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

