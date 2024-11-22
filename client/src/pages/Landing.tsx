import { Navbar } from "@/components/Navbar/Navbar"
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import { Features } from '@/components/Features/Features'

const Landing = () => {

    return (
        <>
            <Navbar/>
            <Hero/>
            <Features/>
            <Footer />
        </>
    )
}

export default Landing