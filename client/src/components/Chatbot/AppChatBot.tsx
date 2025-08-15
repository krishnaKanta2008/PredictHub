import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare as Cube, X, Forward, ArrowDown, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_DEVBOT_SERVER_URL;
const APP_API_KEY = import.meta.env.VITE_DEVBOT_API_KEY;

export default function AppChatBot() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '👋🏻 Greetings! Predicthub at your Service.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [showScrollButton, setShowScrollButton] = React.useState(false);
    const [history, setHistory] = React.useState<{ role: string; content: string }[]>([]);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        if (!isLoading) {
            scrollToBottom();
        }
    }, [messages, isLoading]);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
            setShowScrollButton(isScrolledUp);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setHistory((prev) => [...prev, userMessage]);

        setInput('');
        setIsLoading(true);

        const assistantMessage = { role: 'assistant', content: '' };
        setMessages((prev) => [...prev, assistantMessage]);
        setHistory((prev) => [...prev, assistantMessage]);


        try {
            const response = await fetch(`${BACKEND_URL}/api/chatbots/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey: APP_API_KEY,
                    query: input,
                    history: history,
                }),
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;

                // Update the last assistant message incrementally
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: fullText };
                    return updated;
                });
            }
            setHistory((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: fullText };
                return updated;
            });
        } catch (error) {
            console.error('Streaming error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again later.',
            };
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = errorMessage;
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <Card className="w-80 h-[500px] flex flex-col shadow-xl animate-in slide-in-from-bottom-8 duration-300 overflow-hidden">
                    <CardHeader className="bg-muted/50 p-2 flex flex-row justify-between items-center border-b">
                        <div className="flex items-center gap-2">
                            📈
                            <h2 className="font-semibold -ml-1">PredictHub</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 flex item-center justify-center"
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
                                    'w-fit rounded-lg px-3 py-2 text-sm',
                                    message.role === 'assistant'
                                        ? 'bg-muted'
                                        : 'bg-zinc-800 text-white ml-auto'
                                )}
                            >
                                {message.content}
                            </div>
                        ))}
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
                                {isLoading ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <Forward className="h-3 w-3" />
                                        <span className="sr-only">Send message</span>
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardFooter>
                    <div className="mt-2 mb-2 flex justify-center">
                        <span className="text-[10px]">
                            Powered by <Link to="https://devbots.vercel.app" className='font-semibold text-primary'>DevBots</Link>
                        </span>
                    </div>
                </Card>
            ) : (
                <Button
                    size="icon"
                    variant="default"
                    className="h-12 w-12 rounded-full animate-in fade-in duration-300"
                    onClick={() => setIsOpen(true)}
                >
                    <Cube className="h-6 w-6" />
                    <span className="sr-only">Open chat</span>
                </Button>
            )}
        </div>
    );
}
