import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricProps {
    title: string
    value: number
    change: number
    prefix?: string
}

export function StockMetric({ title, value, change, prefix = "" }: MetricProps) {
    const isPositive = change > 0

    return (
        <Card>
            <CardContent className="mt-[20px]">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {title[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <h3 className="text-2xl font-bold">
                            {prefix}
                            {value.toFixed(2)}
                        </h3>
                        <p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                            {isPositive ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
                            {Math.abs(change).toFixed(2)}%
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}