"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

interface HeroProps {
    onSignupClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSignupClick }) => {
    
    const words = [
        {
            text: "Welcome",
        },
        {
            text: "to",
        },
        {
            text: "PredictHub",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center mt-40 ">
            <p className="text-neutral-600 dark:text-neutral-200 sm:text-base text-center sm:text-left">
                The biggest risk is not taking a risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks !
            </p>
            <TypewriterEffectSmooth words={words} />


            <div> 
                <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2" onClick={onSignupClick}>Sign Up</button>
            </div>
        </div>
    );
}
