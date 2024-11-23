import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconTimeline,
    IconHeartPlus,
    IconBooks,
    IconMessageChatbotFilled,
} from "@tabler/icons-react";
import { useEffect } from "react";

export function Features() {
    const currentTheme = localStorage.getItem("vite-ui-theme");
    useEffect(() => {
    }, [currentTheme]);
    const StockImage = () => (
        <div className="flex flex-1 rounded-xl overflow-hidden">
            {
                currentTheme === "dark" ? (
                    <img src="https://i.ibb.co/rm8TZ0H/Screenshot-2024-11-23-113510.png" alt="dashboard_dark" className="object-cover w-full h-full" />
                ) : (
                    <img src="https://i.ibb.co/hyM06L1/Screenshot-2024-11-23-182023.png" alt="dashboard_light" className="object-cover w-full h-full" />
                )
            }

        </div>
    );
    const Skeleton = () => (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
    );



    const items = [
        {
            title: "Stock Price Prediction",
            description: "Using Various Ml | DL models to predict stock prices.",
            header: <StockImage />,
            className: "md:col-span-2",
            icon: <IconTimeline className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Add your favourite stock",
            description: "Maintain your favourite stock and get daily updates.",
            header: <Skeleton />,
            className: "md:col-span-1",
            icon: <IconHeartPlus className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Learning material and FAQ",
            description: "Read and learn about stock market.",
            header: <Skeleton />,
            className: "md:col-span-1",
            icon: <IconBooks className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "ChatBot trained on stock market data",
            description:
                "Chat with our chatbot to get the latest updates on stock market.",
            header: <Skeleton />,
            className: "md:col-span-2",
            icon: <IconMessageChatbotFilled className="h-4 w-4 text-neutral-500" />,
        },
    ];
    return (
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[30rem] mt-[-70px] p-4 mb-10">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}

