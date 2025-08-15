import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconTimeline,
    IconHeartPlus,
    IconBooks,
    IconMessageChatbotFilled,
} from "@tabler/icons-react";

export function Features() {
    const StockImage = () => (
        <div className="flex flex-1 rounded-xl overflow-hidden">
            <img src="https://i.ibb.co/rm8TZ0H/Screenshot-2024-11-23-113510.png" alt="dashboard_dark" className="object-cover w-full h-full dark:invert-0 invert" />
        </div>
    );
    const WatchlistImage = () => (
        <div className="flex flex-1 rounded-xl overflow-hidden">
            <img src="https://i.ibb.co/XzJsdwt/Screenshot-2024-11-24-111016.png" alt="watchlist_dark" className="object-cover w-full h-full dark:invert-0 invert" />
        </div>
    );

    const LearningImage = () => (
        <div className="flex flex-1 rounded-xl overflow-hidden">
            <img src="https://i.ibb.co/nfmfqkR/Screenshot-2024-11-25-130529.png" alt="learning_dark" className="object-cover w-full h-full dark:invert-0 invert" />
        </div>
    );

    const ChatbotImage = () => (
        <div className="flex flex-1 rounded-xl overflow-hidden">
            <img src="https://i.ibb.co/6HwMnJt/Screenshot-2024-11-26-133655.png" alt="chatbot_dark" className="object-cover w-full h-full dark:invert-0 invert" />
        </div>
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
            title: "Learning material and FAQ",
            description: "Read and learn about stock market.",
            header: <LearningImage />,
            className: "md:col-span-1",
            icon: <IconBooks className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "ChatBot trained on stock market data",
            description:
                "Chat with our chatbot to get the latest updates on stock market.",
            header: <ChatbotImage />,
            className: "md:col-span-1",
            icon: <IconMessageChatbotFilled className="h-4 w-4 text-neutral-500" />,
        },
        {
            title: "Add your favourite stock",
            description: "Maintain your favourite stock and get daily updates.",
            header: <WatchlistImage />,
            className: "md:col-span-2",
            icon: <IconHeartPlus className="h-4 w-4 text-neutral-500" />,
        }
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

