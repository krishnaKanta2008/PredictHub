import { Navbar } from "@/components/Navbar/Navbar"
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import { Features } from '@/components/Features/Features'
import TickerTape from "@/components/TickerTape/TickerTape"
import AppChatBot from "@/components/Chatbot/AppChatBot"

const Landing = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
            <TickerTape />
            <AppChatBot />
        </>
    )
}

export default Landing