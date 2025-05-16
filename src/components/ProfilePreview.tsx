"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define types for the profile data
interface ProfileData {
  profileUrl?: string;
  name?: string;
  location?: string;
  website?: string;
  bio?: string;
  description?: string;
}

// Define props interface
interface ProfilePreviewProps {
  profileData?: ProfileData; // Optional profile data
  userId: string;
  salesMagnet?: boolean;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  profileData,
  userId,
  salesMagnet = false,
}) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/onboarding?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const userData: ProfileData = await res.json();
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (profileData) {
      setProfile(profileData);
    } else {
      fetchUserData();
    }
  }, [profileData, userId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-[#151221] rounded-xl h-full">
      {/* Profile Image */}
      <div className="w-36 h-36 rounded-full mb-6 bg-[#1a1725] flex items-center justify-center border-2 border-purple-600">
        {profile.profileUrl ? (
          <img
            src={profile.profileUrl}
            alt="Profile"
            width={137}
            height={137}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Name */}
      <h2 className="text-white text-2xl font-bold mb-2">
        {profile.name || "Your Name"}
      </h2>

      {/* Location & Website */}
      <div className="flex gap-2 items-center mb-4">
        {profile.location && (
          <span className="text-gray-400 text-sm">
            <span className="mr-1">📍</span> {profile.location}
          </span>
        )}
        {profile.location && profile.website && (
          <span className="text-gray-500">•</span>
        )}
        {profile.website && (
          <span className="text-purple-400 text-sm">
            <span className="mr-1">🔗</span> {profile.website}
          </span>
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="text-gray-300 text-center mb-4 italic">"{profile.bio}"</p>
      )}

      {/* Description */}
      {profile.description && (
        <div className="w-full mt-4">
          <h4 className="text-white text-lg font-semibold mb-2 text-left">
            About
          </h4>
          <p className="text-gray-300 text-left">{profile.description}</p>
        </div>
      )}

      {/* Empty state */}
      {!salesMagnet && !profile.bio && !profile.description && (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic">
          Complete your profile by adding a bio and description
        </div>
      )}
    </div>
  );
};
