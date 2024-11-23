"use client"

import * as React from "react"
import { Star } from 'lucide-react'
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface FeedbackFormProps {
    onSubmit?: (rating: number, message: string) => void
    onClose?: () => void
}

export function FeedbackForm({ onSubmit, onClose }: FeedbackFormProps) {
    const [rating, setRating] = React.useState<number>(0)
    const [hoveredRating, setHoveredRating] = React.useState<number>(0)
    const [message, setMessage] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.(rating, message)
    }

    return (
        <Card className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <h2 className="text-center text-xl font-semibold">
                        Your opinion matters to us!
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    <div className="flex flex-col items-center space-y-3">
                        <span className="text-lg text-muted-foreground">
                            How was your experience?
                        </span>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="focus-visible:outline-none"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                >
                                    <Star
                                        className={cn(
                                            "h-8 w-8 transition-colors",
                                            (hoveredRating || rating) >= star
                                                ? "fill-primary text-primary"
                                                : "fill-muted text-muted"
                                        )}
                                    />
                                    <span className="sr-only">Rate {star} stars</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Leave a message, if you want"
                            className="min-h-[100px] resize-none"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={rating === 0}>
                        Rate now
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        className="text-sm text-muted-foreground"
                        onClick={onClose}
                    >
                        Maybe later
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

