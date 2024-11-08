"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = [
    {
        quote:
            "“Waiting helps you as an investor and a lot of people just can’t stand to wait. If you didn’t get the deferred-gratification gene, you’ve got to work very hard to overcome that.”",
        name: "Charlie Munger",
        title: "Be Patient and Think Long-Term",
    },
    {
        quote:
            "“The stock market is a device to transfer money from the impatient to the patient.”",
        name: "Warren Buffett",
        title: "Be Patient and Think Long-Term",
    },
    {
        quote: "“Thousands of experts study overbought indicators, head - and - shoulder patterns, put - call ratios, the Fed’s policy on money supply…and they can’t predict markets with any useful consistency, any more than the gizzard squeezers could tell the Roman emperors when the Huns would attack.”",
        name: "Peter Lynch",
        title: "Disregard Short-Term Forecasts",
    },
    {
        quote:
            "“I make no attempt to forecast the market—my efforts are devoted to finding undervalued securities.”",
        name: "Warren Buffett",
        title: "Disregard Short-Term Forecasts",
    },
    {
        quote:
            "“Far more money has been lost by investors trying to anticipate corrections, than lost in the corrections themselves.”",
        name: "Peter Lynch",
        title: "Don’t Try to Time the Market",
    },
];
