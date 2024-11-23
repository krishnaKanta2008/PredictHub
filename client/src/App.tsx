import Landing from "./pages/Landing"
import Signup from './pages/Signup';
import { ThemeProvider } from "@/components/Theme/theme-provider"
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import Signin from "./pages/Signin";
import Home from "./pages/Home"
import PrivacyPolicy from "./pages/Privacypolicy";
import Lstm from "./pages/Lstm";
import Support from "./pages/support";
import Learning from "./components/Learning/Learning";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/profile/:username" element={<Profile />} /> 
        <Route path="/signin" element={<Signin/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/lstm" element={<Lstm />} /> 
        <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 
        <Route path="/learning" element={<Learning />} />
        <Route path="/support" element={<Support />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/watchlist/:username" element={<Watchlist />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App