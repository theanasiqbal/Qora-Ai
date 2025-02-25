"use client";
import { setCookie } from "@/lib/helpers";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    type: "",
    website: "",
  });

  // Predefined folders
  const defaultFolders = ["Legal", "Customer", "Products", "Sales", "Finance"];
  const [folders, setFolders] = useState([...defaultFolders]);
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState({});

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding a new folder
  const addFolder = () => {
    if (folderName.trim() !== "" && !folders.includes(folderName)) {
      setFolders([...folders, folderName]);
      setFiles({ ...files, [folderName]: [] }); // Initialize empty file array for new folder
      setFolderName(""); // Clear input field after adding
    }
  };

  // Handle file selection per folder
  const handleFileChange = (folder, event) => {
    setFiles({
      ...files,
      [folder]: [...event.target.files],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCookie("company", formData, 1);

    for (const folder in files) {
      if (files[folder].length > 0) {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("folder", folder); // Send folder name
        files[folder].forEach((file) => data.append("files", file)); // Append files

        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const result = await response.json();
        if (!response.ok) {
          alert(`Error uploading files in ${folder}: ${result.error}`);
        }
      }
    }

    alert("Files uploaded successfully!");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[92vh] overflow-hidden text-center px-4 bg-[#151221]">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      <div className="relative z-10 w-full max-w-3xl overflow-y-scroll bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
                required
                className="w-full bg-[#151221] text-white p-3 rounded-lg"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                Type
              </label>
              <input
                type="text"
                name="type"
                placeholder="Technology, Finance..."
                value={formData.type}
                onChange={handleChange}
                required
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

          {/* File Uploads per Folder */}
          {folders.length > 0 && (
            <div className="mt-8 mb-3">
              <h3 className="text-white text-lg font-semibold">
                Upload Documents
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {folders.map((folder, index) => (
                  <div key={index} className="mt-2">
                    <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                      {folder} Documents
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(folder, e)}
                      className="w-full bg-[#151221] text-white p-3 rounded-lg"
                    />
                  </div>
                ))}
                <div className="mb-4">
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Create New Folder
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      placeholder="Enter folder name"
                      className="w-full bg-[#151221] text-white p-3 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={addFolder}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                      Add Folder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
