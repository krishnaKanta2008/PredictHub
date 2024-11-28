import Landing from "./pages/Landing"
import Signup from './pages/Signup';
import { ThemeProvider } from "@/components/Theme/theme-provider"
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import Signin from "./pages/Signin";
import Home from "./pages/Home"
import PrivacyPolicy from "./pages/Privacypolicy";
import { LSTM } from "./pages/Lstm";
import Support from "./pages/support";
import Learning from "./pages/Learning";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import Prediction from "./pages/Prediction";
import  { RandomForest } from "./pages/RandomForest";
import { ARIMA } from "./pages/ARIMA";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/profile/:username" element={<Profile />} /> 
        <Route path="/signin" element={<Signin/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/prediction-techniques" element={<Prediction />} />
        <Route path="/prediction/lstm" element={<LSTM />} /> 
        <Route path="/prediction/ARIMA" element={<ARIMA />} /> 
        <Route path="/prediction/randomforest" element={<RandomForest />} /> 
        <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 
        <Route path="/learning" element={<Learning />} />
        <Route path="/support" element={<Support />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/watchlist/:username" element={<Watchlist />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App