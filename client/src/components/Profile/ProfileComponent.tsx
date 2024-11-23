import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Copy, Check, Mail} from 'lucide-react';

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

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const ProfileComponent = () => {
  const { username } = useParams();
  const [copied, setCopied] = useState(false);
  const [profileData, setProfileData] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${backendUrl}/profile/details/${username}`);
          setProfileData(response.data.data); // Ensure compatibility with API response structure
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
        }
      };

      fetchProfile();
    }
  }, [username]);

  const copyToClipboard = async () => {
    try {
      if (profileData?.username) {
        await navigator.clipboard.writeText(`https://www.devhub.page/user/${profileData.username}`);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-background">
      <div className="grid gap-6 p-4 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <div className="relative">
              {profileData?.profileBanner ? (
                <img
                  src={profileData.profileBanner}
                  alt="Profile Banner"
                  className="h-48 rounded-t-lg w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t-lg" />
              )}
              <div className="absolute -bottom-12 left-4">
                <div className="relative">
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
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Public Profile & URL */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Public profile & URL</CardTitle>
              <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground break-all">
                {`https://www.devhub.page/user/${profileData?.username}`}
              </p>
            </CardContent>
          </Card>

          {/* Friends */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No friends to show yet.</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
