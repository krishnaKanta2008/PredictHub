import { Navbar } from "@/components/Navbar/Navbar"
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import { Features } from '@/components/Features/Features'
import TickerTape from "@/components/TickerTape/TickerTape"
import ChatWidget from "@/components/Chatbot/Chatbot"

const Landing = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
            <TickerTape />
            <ChatWidget />
        </>
    )
}

export default Landing