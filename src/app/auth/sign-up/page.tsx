"use client";
import { setCookie } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [step, setStep] = useState(1); // Step 1: Personal Info, Step 2: Upload Documents
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
  const router = useRouter()

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding a new folder
  const addFolder = () => {
    if (folderName.trim() !== "" && !folders.includes(folderName)) {
      setFolders([...folders, folderName]);
      setFiles({ ...files, [folderName]: [] });
      setFolderName("");
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
        data.append("folder", folder);
        files[folder].forEach((file) => data.append("files", file));

        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const result = await response.json();
        if (!response.ok) {
          alert(`Error uploading files in ${folder}: ${result.error}`);
        }
        router.push('/chat')
      }
    }

    alert("Files uploaded successfully!");
  };

  // Move to next step
  const nextStep = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.location &&
      formData.type
    ) {
      setStep(2);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  // Move to previous step
  const prevStep = () => setStep(1);

  return (
    <div className="relative flex flex-col items-center justify-center h-full overflow-hidden text-center px-4 bg-[#151221]">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      <div className="relative z-10 w-full max-w-3xl  bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>

        {/* Stepper */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                step === 1 ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              1
            </div>
            <span className="text-gray-300 ml-2">Personal Info</span>
          </div>
          <div className="w-16 h-1 bg-gray-600 mx-4 self-center"></div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                step === 2 ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              2
            </div>
            <span className="text-gray-300 ml-2">Upload Documents</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={nextStep} className="space-y-4">
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

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}