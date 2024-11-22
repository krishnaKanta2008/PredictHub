import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ReactNode } from "react"
import { BarChart2, HelpCircle, FileText } from 'lucide-react'

const SupportSection = ({ title, children, id }: { title: string, children: ReactNode, id?: string }) => (
    <Card className="mb-6" id={id}>
        <CardHeader>
            <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
)

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="mb-4">
        <h3 className="font-semibold text-sm md:text-base mb-2">{question}</h3>
        <p className="text-sm md:text-base text-muted-foreground">{answer}</p>
    </div>
)

const Support = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            {/* <SidebarInset> */}
            <div className="relative">
                <header className="flex h-16 shrink-0 items-center gap-4 border-b px-4">
                    <SidebarTrigger className="-ml-2" />
                    <Separator orientation="vertical" className="h-6" />
                    <h1 className="text-xl md:text-2xl font-bold">PredictHub Support</h1>
                </header>
                <ScrollArea className="h-[calc(100vh-4rem)] px-2 md:px-4 py-4 md:py-6">
                    <SupportSection title="How Can We Help?">
                        <p className="text-sm md:text-base mb-4">
                            Welcome to PredictHub Support. We're here to assist you with any questions or issues you may have regarding our stock market prediction tools and services.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="flex flex-col items-center p-4">
                                    <BarChart2 className="h-6 w-6 mb-2" />
                                    <p className="text-sm font-semibold">Prediction Tools</p>
                                    <Button variant="link" className="text-sm p-0" onClick={() => window.location.href = '/home'}>View Guide</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col items-center p-4">
                                    <HelpCircle className="h-6 w-6 mb-2" />
                                    <p className="text-sm font-semibold">FAQs</p>
                                    <Button variant="link" className="text-sm p-0" onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}>Read FAQs</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col items-center p-4">
                                    <FileText className="h-6 w-6 mb-2" />
                                    <p className="text-sm font-semibold">Documentation</p>
                                    <Button variant="link" className="text-sm p-0" onClick={() => window.location.href = '/lstm'}>Browse Docs</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </SupportSection>

                    <SupportSection title="Frequently Asked Questions" id="faq-section" >
                        <FAQItem
                            question="What prediction models does PredictHub use?"
                            answer="PredictHub employs a variety of models including LSTM (Long Short-Term Memory), ARIMA (AutoRegressive Integrated Moving Average), and ensemble methods that combine multiple approaches for more robust predictions."
                        />
                        <FAQItem
                            question="How accurate are PredictHub's stock market predictions?"
                            answer="The accuracy of our predictions varies depending on market conditions and the specific stock. While we strive for high accuracy, stock market behavior is inherently complex and influenced by many factors. Our predictions should be used as one tool among many in your investment decision-making process."
                        />
                        <FAQItem
                            question="Can I use PredictHub for day trading?"
                            answer="While PredictHub offers short-term predictions, we primarily focus on medium to long-term market trends. For day trading, we recommend using our tools in conjunction with real-time market data and other short-term analysis techniques."
                        />
                        <FAQItem
                            question="How often is the prediction data updated?"
                            answer="We update our predictions daily with the latest market data. However, the frequency of model retraining varies depending on the specific algorithm and market conditions."
                        />
                        <FAQItem
                            question="Is there a mobile app available for PredictHub?"
                            answer="Currently, we offer a responsive web application that works well on mobile devices. We are in the process of developing dedicated mobile apps for iOS and Android, which will be released in the near future."
                        />
                    </SupportSection>

                    <SupportSection title="Contact Us">
                        <form className="space-y-4 px-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                <Input id="name" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <Input id="email" type="email" placeholder="your.email@example.com" />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                                <Input id="subject" placeholder="Brief description of your issue" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                                <Textarea id="message" placeholder="Please provide details about your issue or question" rows={4} />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </SupportSection>
                </ScrollArea>
            </div>
            
            {/* </SidebarInset> */}
        </SidebarProvider>
    )
}

export default Support