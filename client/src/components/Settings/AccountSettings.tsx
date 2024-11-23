import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { Icons } from '@/components/ui/icons';
import UploadComponent from '@/components/UploadComponent/UploadComponent';
import { ScrollArea } from '@/components/ui/scroll-area';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface ProfileData {
    bio: string;
    location: string;
    profileImage?: File | null;
    profileBanner?: File | null;
}

const UpdateProfile = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<ProfileData>({
        bio: '',
        location: '',
        profileImage: null,
        profileBanner: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('predicthub_username');
        setUsername(storedUsername);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            if (username) {
                try {
                    const response = await axios.get(`${backendUrl}/profile/details/${username}`);
                    setProfileData(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch profile data:', error);
                    toast.error('Failed to fetch profile data');
                }
            }
        };

        fetchProfile();
    }, [username]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (file: File, type: 'profileImage' | 'profileBanner') => {
        setProfileData((prevData) => ({
            ...prevData,
            [type]: file,
        }));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!username) {
            toast.error('No username found. Please login again.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('bio', profileData.bio);
        formData.append('location', profileData.location);
        if (profileData.profileImage) {
            formData.append('profileImage', profileData.profileImage);
        }
        if (profileData.profileBanner) {
            formData.append('profileBanner', profileData.profileBanner);
        }

        try {
            const response = await axios.put(`${backendUrl}/profile/update/${username}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success('Profile updated successfully');
            } else {
                toast.error(response.data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-4 grid gap-6 sm:w-80">
            <form onSubmit={handleSubmit} className="grid gap-4">
                <ScrollArea className="h-60 overflow-y-auto p-2">
                    <div className="p-2">
                        <Label htmlFor="profileImage" className="dark:text-neutral-200 mb-1">
                            Profile Image
                        </Label>
                        <UploadComponent onFileChange={(file) => handleFileChange(file, 'profileImage')} />
                    </div>
                    <div className="p-2">
                        <Label htmlFor="profileBanner" className="dark:text-neutral-200 mb-1">
                            Profile Banner
                        </Label>
                        <UploadComponent onFileChange={(file) => handleFileChange(file, 'profileBanner')} />
                    </div>
                    <div className="p-2">
                        <Label htmlFor="bio" className="dark:text-neutral-200">
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio || ''}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Write something about yourself"
                            className="mt-1"
                        />
                    </div>
                    <div className="p-2">
                        <Label htmlFor="location" className="dark:text-neutral-200">
                            Location
                        </Label>
                        <Input
                            id="location"
                            name="location"
                            value={profileData.location || ''}
                            onChange={handleChange}
                            disabled={isLoading}
                            placeholder="Your location"
                            className="mt-1"
                        />
                    </div>
                </ScrollArea>
                <Button type="submit" disabled={isLoading} className="w-full mt-4">
                    {isLoading ? (
                        <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Updating...
                        </>
                    ) : (
                        'Update Profile'
                    )}
                </Button>
            </form>
        </div>
    );
};

export default UpdateProfile;
