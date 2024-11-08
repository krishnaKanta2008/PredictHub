import { useEffect, useRef, useState } from 'react'
import { AuroraBackgroundDemo } from "@/components/AuroraBackground/AuroraBackground"
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCards/InfiniteMovingCards"
import { NavbarDemo } from "@/components/Navbar/Navbar"
import Footer from '@/components/Footer/Footer'

const Landing = () => {
    const cardsRef = useRef<HTMLDivElement>(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsIntersecting(entry.isIntersecting)
                })
            },
            {
                threshold: 0.1
            }
        )

        const currentCardsRef = cardsRef.current;
        if (currentCardsRef) {
            observer.observe(currentCardsRef)
        }

        return () => {
            if (currentCardsRef) {
                observer.unobserve(currentCardsRef)
            }
        }
    }, [])

    return (
        <>
            <NavbarDemo />
            <div className="relative">
                <AuroraBackgroundDemo />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
            </div>
            <div
                ref={cardsRef}
                className="relative bg-black transition-opacity duration-1000 ease-in-out"
                style={{ opacity: isIntersecting ? 1 : 0 }}
            >
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
                <InfiniteMovingCardsDemo />
            </div>
            <Footer />
        </>
    )
}

export default Landing