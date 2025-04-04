"use client";
import { AnimatedCircularProgressBar } from "@/components/ProgressBar";
import { setCookie } from "@/lib/helpers";
import useConfetti from "@/lib/use-confetti";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ripple } from "@/components/Ripple";
import { BorderBeam } from "@/components/Beam";
import { AnimatedList } from "@/components/AnimatedList";
import toast from "react-hot-toast";



export default function OnBoarding() {

  const [selectedAgents, setSelectedAgents] = useState([]);
  const [step, setStep] = useState(1);
  const { user } = useUser(); // Get authenticated user
  const router = useRouter();
  const [confetti, setConfetti] = useState(false);
  const [sources, setSources] = useState([]);
  const [sourceInput, setSourceInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      name: "Payment received",
      description: "Magic UI",
      time: "15m ago",
      icon: "💸",
      color: "#00C9A7",
    },
    {
      name: "User signed up",
      description: "Magic UI",
      time: "10m ago",
      icon: "👤",
      color: "#FFB800",
    },
    {
      name: "New message",
      description: "Magic UI",
      time: "5m ago",
      icon: "💬",
      color: "#FF3D71",
    },
    {
      name: "New event",
      description: "Magic UI",
      time: "2m ago",
      icon: "🗞️",
      color: "#1E86FF",
    }, {
      name: "Payment received",
      description: "Magic UI",
      time: "15m ago",
      icon: "💸",
      color: "#00C9A7",
    },
    {
      name: "User signed up",
      description: "Magic UI",
      time: "10m ago",
      icon: "👤",
      color: "#FFB800",
    },
    {
      name: "New message",
      description: "Magic UI",
      time: "5m ago",
      icon: "💬",
      color: "#FF3D71",
    },
    {
      name: "New event",
      description: "Magic UI",
      time: "2m ago",
      icon: "🗞️",
      color: "#1E86FF",
    },
  ]);
  const [formData, setFormData] = useState({
    userId: user?.id || "",
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    location: "",
    type: "",
    website: "",
    profileUrl: ""
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id || "",
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        profileUrl: user.imageUrl || "",
      }));
    }
  }, [user]);

  // Agents for selection
  const agents = [
    { id: "oliver", name: "Oliver", role: "Sales Agent", selected: false, image: "/image/carousel1.png" },
    { id: "cassie", name: "Cassie", role: "Marketing Agent", selected: false, image: "/image/carousel2.png" },
    { id: "cooper", name: "Cooper", role: "Social Media Manager", selected: false, image: "/image/carousel3.png" },
    { id: "james", name: "James", role: "Finance Manager", selected: false, image: "/image/carousel4.png" },
  ];

  // Integration options
  const [integrations, setIntegrations] = useState({
    salesforce: false,
    hubspot: false
  });

  // Predefined folders
  const defaultFolders = ["Legal", "Customer", "Products", "Sales", "Finance"];
  const [folders, setFolders] = useState([...defaultFolders]);
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState({});
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle agent selection
  const toggleAgent = (agentId) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents([agentId]);
      setConfetti(true);
    }
  };

  useConfetti(confetti);

  // Handle integration toggles
  // const toggleIntegration = (integration) => {
  //   setIntegrations({
  //     ...integrations,
  //     [integration]: !integrations[integration]
  //   });
  // };

  // Handle adding sources
  const addSource = () => {
    if (sourceInput.trim() !== "" && !sources.includes(sourceInput.trim())) {
      setSources([...sources, sourceInput.trim()]);
      setSourceInput("");
    }
  };

  // Handle removing sources
  const removeSource = (index) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  // Handle adding a new folder
  const addFolder = () => {
    if (folderName.trim() !== "" && !folders.includes(folderName)) {
      setFolders([...folders, folderName]);
      setFiles({ ...files, [folderName]: [] });
      setFolderName("");
    }
  };

  // Function to handle file uploads
  const handleFileChange = (folder, event) => {
    const uploadedFiles = event.target.files;

    // Update the files state for the respective folder
    setFiles({
      ...files,
      [folder]: [...uploadedFiles],  // Store the uploaded files for that folder
    });

    // Calculate the total number of files uploaded across all folders
    const totalFileCount = Object.values(files).reduce((acc, fileArr) => acc + fileArr.length, 0) + uploadedFiles.length;

    // Calculate the total number of folders
    const totalFolders = folders.length;

    // Assuming each folder can hold 1 file for 100% progress, we calculate the progress per folder
    const progressPerFolder = 100 / totalFolders;

    // Calculate the progress based on how many files have been uploaded
    const fileUploadProgress = (totalFileCount / totalFolders) * progressPerFolder;

    // Set the total file upload progress
    setFileUploadProgress(fileUploadProgress);
  };

  const [popupVisible, setPopupVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      router.push("/chat");
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }

    setCookie("company", formData, 7);

    // Handle Salesforce integration if selected
    // if (integrations.salesforce) {
    //   const salesforceData = new FormData();
    //   salesforceData.append("name", formData.name);
    //   salesforceData.append("folder", "Salesforce");

    //   await fetch("/api/upload", {
    //     method: "POST",
    //     body: salesforceData,
    //   });
    // }

    // // Handle Hubspot integration if selected
    // if (integrations.hubspot) {
    //   const hubspotData = new FormData();
    //   hubspotData.append("name", formData.name);
    //   hubspotData.append("folder", "Hubspot");

    //   await fetch("/api/upload", {
    //     method: "POST",
    //     body: hubspotData,
    //   });
    // }

    // Upload files for each folder
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
          toast.error(`Error uploading files in ${folder}: ${result.error}`);
        }
      }
    }
    setPopupVisible(true);
    setTimeout(() => {
      window.location.replace("/chat");  // Forces a full reload after the 10-second pause
    }, 20000);
    toast.success("Setup completed successfully!");
    setTimeout(() => {
      window.location.replace("/chat"); // Forces a full reload
    }, 0);
  };

  // Move to next step
  const nextStep = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (selectedAgents.length > 0) {
        setShowSidebar(true);  // Show the left sidebar after selecting an agent
        setStep(2);
      } else {
        toast.error("Please select at least one agent.");
      }
    } else if (step === 2) {
      if (formData.location && formData.type) {
        setStep(3);
      } else {
        toast.error("Please fill out all required fields.");
      }
    }
  };

  const calculateProgress = () => {
    let progress = 0;

    // Step 1 - Persona Selection Progress
    if (step === 1) {
      if (selectedAgents.length > 0) {
        progress = 33;  // Mark Step 1 as 33% complete when an agent is selected
      }
    }

    // Step 2 - Personal Info Progress
    if (step === 2) {
      progress = 15; // Step 2 starts at 15%

      let filledFields = 0;
      if (formData.location) filledFields++;
      if (formData.type) filledFields++;
      if (formData.website) filledFields++;

      // Adding percentage progress for fields filled
      progress += (filledFields / 3) * 15; // 15% for Step 2, split across 3 fields (Location, Type, Website)
    }

    // Step 3 - Workspace Setup (Folders Creation and File Upload Progress)
    if (step === 3) {
      progress = 52;  // Step 3 starts at 52%

      // Add the progress based on how many files have been uploaded across the folders
      const totalFolders = folders.length;
      const totalFilesUploaded = Object.values(files).reduce((acc, fileArr) => acc + fileArr.length, 0);

      // Calculate the progress based on the uploaded files
      // If totalFolders = 5, each folder will contribute (52 / 5) = 10.4% to the total progress.
      const fileProgress = (totalFilesUploaded / totalFolders) * 52;
      progress += fileProgress; // Add file upload progress

    }

    // Ensure the progress doesn't exceed 100%
    if (progress > 100) progress = 100;

    return progress;
  };

  useEffect(() => {
    calculateProgress();
  }, [folders]);
  // Move to previous step
  const prevStep = () => {
    if (step > 1) {
      if (step === 2) {
        setShowSidebar(false);
      }
      setStep(step - 1);
    }
  };

  return (
    <div className="relative flex h-full overflow-hidden bg-[#151221]">
      {/* Left Sidebar */}
      {showSidebar && selectedAgents.length > 0 && (
        <motion.div
          className="fixed left-0 top-0 w-1/4 h-full p-6 flex flex-col justify-center items-center"
          initial={{ opacity: 0, x: '100%' }}  // Start from the left (hidden state)
          animate={{ opacity: 1, x: 0 }}       // Slide to the left (on-screen)
          exit={{ opacity: 0, x: '100%' }}     // Slide back to the right (off-screen)
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5,
          }}
        >
          <div className="h-[80vh] p-4 rounded-lg mb-4 flex flex-col items-center justify-center">
            {/* Show selected persona */}
            {selectedAgents.length > 0 && (
              <div className="text-white grid gap-4 items-center">
                {/* Container for image and progress bar */}
                <div className="relative w-44 h-44">
                  {/* Image */}
                  <img
                    src={agents.find(agent => agent.id === selectedAgents[0])?.image}
                    alt={agents.find(agent => agent.id === selectedAgents[0])?.name}
                    className="w-full h-full rounded-full object-cover p-6"
                  />

                  {/* Animated Circular Progress Bar */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <AnimatedCircularProgressBar
                      max={100}  // You can adjust the max value as per your requirements
                      min={0}
                      value={calculateProgress()} // Pass calculated progress here
                      gaugePrimaryColor="#6b21a8" // Set to bg-purple-900 color (hex equivalent)
                      gaugeSecondaryColor="#E0E0E0" // Define the secondary color
                      className="w-full h-full" // Ensure it fills the container
                    />
                  </div>
                </div>

                <h4 className="font-semibold text-center">
                  {agents.find(agent => agent.id === selectedAgents[0])?.name}
                </h4>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Content (Right Side) */}
      <div className={`w-full ${showSidebar ? "pl-28" : ""} flex flex-col items-center justify-center p-4`}
        style={{
          position: "relative",
        }}
      >
        <div className="relative z-10 w-full max-w-3xl bg-[#1a1725] p-8 rounded-xl shadow-lg"
          style={{
            position: "relative",
          }}>
          <BorderBeam
            duration={6}
            size={300}
            className="from-transparent via-[#6b21a8] to-transparent"
            style={{ top: 0, right: 0 }}
          />
          <BorderBeam
            duration={6}
            delay={3}
            size={300}
            className="from-transparent via-[#9c40ff] to-transparent"
            style={{ top: 0, left: 0 }}
          />


          <h2 className="text-white text-center text-2xl font-bold mb-6">Onboarding</h2>

          {/* Stepper */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 1 ? "bg-purple-600" : "bg-gray-600"
                  }`}
              >
                1
              </div>
              <span className="text-gray-300 ml-2">Choose Persona</span>
            </div>
            <div className="w-10 h-1 bg-gray-600 mx-2 self-center"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 2 ? "bg-purple-600" : "bg-gray-600"
                  }`}
              >
                2
              </div>
              <span className="text-gray-300 ml-2">Personal Info</span>
            </div>
            <div className="w-10 h-1 bg-gray-600 mx-2 self-center"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 3 ? "bg-purple-600" : "bg-gray-600"
                  }`}
              >
                3
              </div>
              <span className="text-gray-300 ml-2">Setup Workspace</span>
            </div>
          </div>


          {step === 1 && (
            <div className="space-y-4 overflow-hidden  pr-2 h-[60vh]">
              <h3 className="text-white text-lg font-semibold mb-4">Choose Your Agents</h3>

              {/* Agent Selection Grid */}
              <div className="flex  overflow-x-auto gap-4 mb-6">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => toggleAgent(agent.id)}
                    className={`p-2 rounded-lg cursor-pointer border-2 ${selectedAgents.includes(agent.id)
                      ? "border-purple-500 bg-purple-900 bg-opacity-30"
                      : "border-gray-700 hover:border-purple-400"
                      }
                        ${selectedAgents.length === 0 || selectedAgents.includes(agent.id) ? "" : "blur-sm"}`}
                  >
                    <div className="w-full h-40 mx-auto mb-3 bg-[#151221] rounded-lg flex items-center justify-center">
                      {/* Replace with actual images */}
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-white font-semibold">{agent.name}</h4>
                    <p className="text-gray-400 text-sm">{agent.role}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {agents.find(agent => agent.id === selectedAgents[0])?.name === "Oliver" ? (
                <form onSubmit={nextStep} >
                  <div className="grid grid-cols-2 gap-4">

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
                  <div className="flex gap-4 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </form>
              ) : (
                // If the selected agent is not Oliver, show the "Development in Progress" message
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold">Development in Progress</h1>
                  <p className="mt-4 text-lg">We are working on this feature for your selected agent. Stay tuned!</p>
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-40 bg-gray-600 mt-10  hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-scroll scroll-bar pr-2 h-[60vh]">
              {/* File Uploads per Folder */}
              {folders.length > 0 && (
                <div className="mt-4 mb-3 max-h-96 overflow-y-auto">
                  <h3 className="text-white text-lg font-semibold mb-2 text-left">
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
                          className="w-full bg-[#151221] file:bg-violet-600 file:rounded-lg file:border-none text-white p-3 rounded-lg"
                        />
                      </div>
                    ))}
                    <div className="mb-4 mt-2.5">
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
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference Sources */}
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-2 text-left">Reference Sources (Optional)</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={sourceInput}
                    onChange={(e) => setSourceInput(e.target.value)}
                    placeholder="Enter website or reference URL"
                    className="flex-1 bg-[#151221] text-white p-3 rounded-lg"
                    onKeyDown={(e) => e.key === 'Enter' && addSource()}
                  />
                  <button
                    type="button"
                    onClick={addSource}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>

                {/* Display added sources */}
                {sources.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sources.map((source, index) => (
                      <div key={index} className="bg-[#151221] text-white px-3 py-1 rounded-lg flex items-center">
                        {source}
                        <button
                          onClick={() => removeSource(index)}
                          className="ml-2 text-gray-400 hover:text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Integrations */}
              {/* <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-2 text-left">Integrations (Optional)</h3>
              <div className="flex gap-4">
                <div 
                  onClick={() => toggleIntegration('salesforce')}
                  className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer border ${
                    integrations.salesforce 
                    ? "border-purple-500 bg-purple-900 bg-opacity-30" 
                    : "border-gray-700 hover:border-purple-400"
                  }`}
                >
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span className="text-white">Salesforce</span>
                </div>
                <div 
                  onClick={() => toggleIntegration('hubspot')}
                  className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer border ${
                    integrations.hubspot 
                    ? "border-purple-500 bg-purple-900 bg-opacity-30" 
                    : "border-gray-700 hover:border-purple-400"
                  }`}
                >
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  <span className="text-white">Hubspot</span>
                </div>
              </div>
            </div> */}

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
                  disabled={loading}
                  className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black  flex justify-center items-center z-50">
          {/* Ripple Effect in the Background */}
          <Ripple
            className="absolute inset-0 z-0"
            mainCircleSize={210}
            mainCircleOpacity={0.24}
            numCircles={8}
          />

          <div className="flex items-center justify-center max-w-4xl p-6 bg-opacity-80 rounded-lg relative z-10 w-full">
            {/* Left Notification Section */}
            <div className="flex-1 p-1 mr-10 ml-10">
              <AnimatedList delay={300} className="my-custom-class">
                {notifications.slice(Math.ceil(notifications.length / 2)).map((notification, idx) => (
                  <div key={idx} className="notification-item p-1 rounded-lg w-[250px] shadow-md">
                    <div
                      className="flex items-center gap-1"
                      style={{ backgroundColor: notification.color, borderRadius: '8px', padding: '8px 12px' }}
                    >
                      <span className="text-lg">{notification.icon}</span>
                      <div>
                        <h5 className="text-white text-sm font-semibold">{notification.name}</h5>
                        <p className="text-white text-xs">{notification.description}</p>
                        <span className="text-gray-300 text-xs">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>

            {/* Centered Agent's Image */}
            <div className="flex flex-col items-center justify-center p-6">
              {selectedAgents.length > 0 && (
                <div className="text-white grid gap-4 items-center">
                  {/* Container for image */}
                  <div className="relative w-40 h-40">
                    <img
                      src={agents.find(agent => agent.id === selectedAgents[0])?.image}
                      alt={agents.find(agent => agent.id === selectedAgents[0])?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-center text-xl mt-4">
                    {agents.find(agent => agent.id === selectedAgents[0])?.name}
                  </h4>
                </div>
              )}
            </div>

            {/* Right Notification Section */}
            <div className="flex-1 p-1 mr-10 ml-10">
              <AnimatedList delay={300} className="my-custom-class">
                {notifications.slice(Math.ceil(notifications.length / 2)).map((notification, idx) => (
                  <div key={idx} className="notification-item p-1 rounded-lg w-[250px] shadow-md">
                    <div
                      className="flex items-center gap-1"
                      style={{ backgroundColor: notification.color, borderRadius: '8px', padding: '8px 12px' }}
                    >
                      <span className="text-lg">{notification.icon}</span>
                      <div>
                        <h5 className="text-white text-sm font-semibold">{notification.name}</h5>
                        <p className="text-white text-xs">{notification.description}</p>
                        <span className="text-gray-300 text-xs">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}