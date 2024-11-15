import Landing from "./pages/Landing"
import Signup from './pages/Signup';
import { ThemeProvider } from "next-themes"
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import Signin from "./pages/Signin";
import Home from "./pages/Home"
import PrivacyPolicy from "./pages/Privacypolicy";
import Lstm from "./pages/Lstm";
import Support from "./pages/support";

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<Signin/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/lstm" element={<Lstm />} /> 
        <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App