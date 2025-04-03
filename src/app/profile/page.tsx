"use client";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@/lib/helpers";
import { ProfilePreview } from "@/components/ProfilePreview";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    website: "",
    bio: "",
    description: ""
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState("/api/placeholder/150/150");
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const res = await fetch(`/api/onboarding?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const userData = await res.json();
        if (userData) {
          setFormData(prevState => ({
            ...prevState,
            name: userData.name || prevState.name,
            email: userData.email || prevState.email,
            location: userData.location || prevState.location,
            website: userData.website || prevState.website,
            bio: userData.bio || prevState.bio,
            description: userData.description || prevState.description,
          }));

          // ?if (userData.profileImageURL) {
          setProfileImageURL(user.imageUrl);
          // 
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isSignedIn, user?.id]);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageURL(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      // Prepare data for the PATCH request
      const updateData = {
        userId: user.id,
        ...formData,
        profileUrl: profileImageURL, // Including profile image URL in case of an update
      };

      // Send PATCH request to update user data
      const res = await fetch("/api/onboarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update user data");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    }

    // Handle profile image upload if needed
    if (profileImage) {
      const imageData = new FormData();
      imageData.append("name", formData.name);
      imageData.append("profileImage", profileImage);

      try {
        const response = await fetch("/api/profile/upload", {
          method: "POST",
          body: imageData,
        });

        if (!response.ok) {
          const result = await response.json();
          toast.error(`Error uploading profile image: ${result.error}`);
        }
      } catch (error) {
        toast.error(`Error uploading profile image: ${error.message}`);
      }
    }
  };


  // Prepare profile data to pass to the component
  const previewData = {
    ...formData,
    profileImageURL: profileImageURL
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#151221] p-4">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      <div className="relative z-10 w-full max-w-6xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">Profile</h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Image Upload */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="w-full bg-[#151221] file:bg-violet-600 file:rounded-lg file:border-none text-white p-3 rounded-lg"
                />
              </div>

              {/* Grid for basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#151221] text-white p-3 rounded-lg"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#151221] text-white p-3 rounded-lg"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#151221] text-white p-3 rounded-lg"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="www.example.com"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#151221] text-white p-3 rounded-lg"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                  Bio
                </label>
                <input
                  type="text"
                  name="bio"
                  placeholder="Short bio (1-2 sentences)"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-[#151221] text-white p-3 rounded-lg"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us more about yourself or your company"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-[#151221] text-white p-3 scroll-bar rounded-lg resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
              >
                Save Profile
              </button>
            </form>
          </div>

          {/* Right side - Using the reusable ProfilePreview component */}
          <div className="flex-1">
            <ProfilePreview profileData={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}