import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Copy, Check, Mail } from 'lucide-react';
import Marquee from "@/components/ui/marquee";

interface UserResponse {
  bio: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  profileImage: string;
  profileBanner: string;
  location: string;
}

interface WatchlistResponse {
  success: boolean;
  watchlist: string[];
  message?: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      height: "100%",
      colorTheme: "dark",
      locale: "en",
    });
    document.getElementById("tradingview-widget-container__widget")?.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-[336px]">
      <div id="tradingview-widget-container__widget" className="h-full"></div>
    </div>
  );
};

const ProfileComponent = () => {
  const { username } = useParams();
  const [copied, setCopied] = useState(false);
  const [profileData, setProfileData] = useState<UserResponse | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${backendUrl}/profile/details/${username}`);
          setProfileData(response.data.data);
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
          setErrorMessages((prev) => [...prev, 'Failed to fetch profile data']);
        }
      };

      fetchProfile();
    }
  }, [username]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!username) {
        setErrorMessages((prev) => [...prev, "Please log in to view the watchlist"]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/watchlist/${username}`);
        const data: WatchlistResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch watchlist");
        }

        setWatchlist(data.watchlist);
      } catch (err) {
        setErrorMessages((prev) => [...prev, "Failed to fetch watchlist"]);
        console.error("Error fetching watchlist:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [username]);

  const copyToClipboard = async () => {
    try {
      if (profileData?.username) {
        await navigator.clipboard.writeText(`https://predicthub.vercel.app/profile/${profileData.username}`);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-background min-h-screen w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] gap-6 p-4">
          {/* Left Section */}
          <div className="space-y-6">
            <Card>
              <div className="relative">
                {profileData?.profileBanner ? (
                  <img
                    src={profileData.profileBanner}
                    alt="Profile Banner"
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t-lg" />
                )}
                <div className="absolute -bottom-12 left-4">
                  <Avatar className="w-32 h-32 border-4 border-background">
                    {profileData?.profileImage ? (
                      <AvatarImage alt="Profile Picture" src={profileData.profileImage} />
                    ) : (
                      <AvatarFallback>
                        {profileData?.firstname?.[0]}
                        {profileData?.lastname?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
              </div>
              <div className="pt-16 space-y-4 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {profileData ? `@${profileData.username}` : <Skeleton className="h-4 w-24" />}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">
                  {profileData
                    ? `${profileData.firstname} ${profileData.lastname}`
                    : <Skeleton className="h-8 w-48" />}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {profileData ? profileData.bio : <Skeleton className="h-16 w-full" />}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profileData ? (
                    <>
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        {profileData.email}
                      </Button>
                      {profileData.location && (
                        <Button variant="outline">
                          <MapPin className="mr-2 h-4 w-4" />
                          {profileData.location}
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Skeleton className="h-10 w-[200px]" />
                      <Skeleton className="h-10 w-[100px]" />
                    </>
                  )}
                </div>
              </div>
            </Card>
            {/* Watchlist */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Favourite Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  {
                    isLoading
                      ? <Skeleton className="h-16 w-full" />
                      : watchlist.length === 0 && <p className="text-muted-foreground">No stocks in watchlist</p>
                  }
                  <Marquee pauseOnHover className="[--duration:20s]">
                    {errorMessages.length > 0
                      ? errorMessages.map((error, index) => (
                        <span key={index} className="text-red-500 mx-2">
                          {error}
                        </span>
                      ))
                      : watchlist.map((item, index) => (
                        <span key={index} className="mx-2">
                          {item}
                        </span>
                      ))}
                  </Marquee>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* News & Copy Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Public profile & URL</CardTitle>
                <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground break-all">
                  {`https://predicthub.vercel.app/profile/${profileData?.username}`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>News Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <TradingViewWidget />
              </CardContent>
            </Card>

            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
