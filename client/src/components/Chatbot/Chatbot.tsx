import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessagesSquare as Cube, X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '👋🏻 Greetings! I am PredictHub, your specialized financial assistant and stock market expert.' }
    ])
    const [input, setInput] = React.useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = { role: 'user', content: input }
        setMessages([...messages, userMessage])
        setInput('')

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
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-4 space-y-4">
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
                    </CardContent>
                    <CardFooter className="border-t p-4">
                        <form onSubmit={handleSubmit} className="flex w-full relative">
                            <Input
                                placeholder="Ask something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            >
                                <Send className="h-3 w-3" />
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
                </Button>
            )}
        </div>
    )
}

