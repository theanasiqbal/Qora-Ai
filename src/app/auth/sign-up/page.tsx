"use client";
import { setCookie } from "@/lib/helpers";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    type: "",
  });
  const [files, setFiles] = useState([]);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle multiple file selection
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCookie("company", formData, 1);
    if (files.length > 0) {
      const data = new FormData();
      data.append("name", formData.name);
      files.forEach((file) => data.append("files", file));

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Files uploaded successfully!");
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[92vh] overflow-hidden text-center px-4 bg-[#151221]">
      {/* Background Gradient 1 */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      {/* Background Gradient 2 */}
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] top-[16%] left-[40%]"></div>

      {/* Sign-Up Form */}
      <div className="relative z-10 w-full max-w-3xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Three Fields in One Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Name Field */}
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
                className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email Field */}
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
                className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Location Field */}
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
                className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Type Field */}
          <div>
            <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
              Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="ex : Technology, Finance..."
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          </div>

          

          {/* Company Documents Upload */}
          <div className="mb-4">
            <label className="block text-gray-300 text-left text-sm font-semibold mb-1">
              Company Documents
            </label>
            <div className="bg-[#1f1b2d] p-3 rounded-lg text-gray-400 text-xs">
              Upload relevant documents such as{" "}
              <span className="text-gray-200">
                Project Requirements, Competitor Analysis, Sales Reports, Legal
                Documents, Company Policies, and Customer Data
              </span>
              . Accepted format:{" "}
              <span className="text-white font-medium">PDF</span>.
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-2 w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 file:bg-purple-700 file:border-none file:text-white file:py-2 file:px-4 file:rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition-all duration-300">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
