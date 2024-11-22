import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconTimeline,
    IconHeartPlus,
    IconBooks,
    IconMessageChatbotFilled,
} from "@tabler/icons-react";

export function Features() {
    return (
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem] mt-[-70px] p-4 mb-10">
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
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
    {
        title: "Stock Price Prediction",
        description: "Using Various Ml | DL models to predict stock prices.",
        header: <Skeleton />,
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
