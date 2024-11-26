import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageSquare as Cube, X, Forward, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icons } from "@/components/ui/icons";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '👋🏻 Greetings! I am PredictHub, your specialized financial assistant and stock market expert.' }
    ])
    const [input, setInput] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [showScrollButton, setShowScrollButton] = React.useState(false)

    const messagesEndRef = React.useRef<HTMLDivElement>(null)
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    React.useEffect(() => {
        if (!isLoading) {
            scrollToBottom()
        }
    }, [messages, isLoading])

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
            const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100
            setShowScrollButton(isScrolledUp)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user', content: input }
        setMessages([...messages, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch(`${backendUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: input })
            })
            const data = await response.json()
            const botMessage = { role: 'assistant', content: data.response }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error('Error fetching response:', error)
            const errorMessage = { role: 'assistant', content: 'Sorry, something went wrong. Please try again later.' }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <Card className="w-80 h-[500px] flex flex-col shadow-xl animate-in slide-in-from-bottom-8 duration-300 rounded-t-xl">
                    <CardHeader className="bg-zinc-800 text-white p-2 flex flex-row justify-between items-center rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <span>📈</span>
                            <h2 className="font-semibold -ml-1">PredictHub</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white dark:hover:text-white/90 h-8 w-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close chat</span>
                        </Button>
                    </CardHeader>
                    <CardContent
                        className="flex-1 overflow-auto p-4 space-y-4"
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "w-fit rounded-lg px-3 py-2 text-sm",
                                    message.role === 'assistant'
                                        ? "bg-muted"
                                        : "bg-zinc-800 text-white ml-auto"
                                )}
                            >
                                {message.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center justify-center mt-4">
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    {showScrollButton && (
                        <Button
                            size="icon"
                            className="absolute bottom-20 left-[calc(50%)] h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700"
                            onClick={scrollToBottom}
                        >
                            <ArrowDown className="h-4 w-4 text-white" />
                            <span className="sr-only">Scroll to bottom</span>
                        </Button>
                    )}
                    <CardFooter className="border-t p-2">
                        <form onSubmit={handleSubmit} className="flex w-full relative">
                            <Input
                                placeholder="Ask something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="pr-10"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                disabled={isLoading}
                            >
                                {
                                    isLoading
                                        ? <Icons.spinner className="h-4 w-4 animate-spin" />
                                        : <>
                                            <Forward className="h-3 w-3" />
                                            <span className="sr-only">Send message</span>
                                        </>
                                }   
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-zinc-700 animate-in fade-in duration-300"
                    onClick={() => setIsOpen(true)}
                >
                    <Cube className="h-6 w-6 text-white" />
                    <span className="sr-only">Open chat</span>
                </Button>
            )}
        </div>
    )
}

