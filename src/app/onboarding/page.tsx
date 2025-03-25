"use client";
import { setCookie } from "@/lib/helpers";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnBoarding() {
  const [step, setStep] = useState(1); 
  const { user } = useUser(); // Get authenticated user
  const router = useRouter();

  const [formData, setFormData] = useState({
    userId:user?.id || "",
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
    { id: "oliver", name: "Oliver", role: "Sales Agent", selected: false },
    { id: "cassie", name: "Cassie", role: "Marketing Agent", selected: false },
    { id: "cooper", name: "Cooper", role: "Social Media Manager", selected: false },
    { id: "james", name: "James", role: "Finance Manager", selected: false },
  ];
  
  const [selectedAgents, setSelectedAgents] = useState([]);
  
  // Integration options
  const [integrations, setIntegrations] = useState({
    salesforce: false,
    hubspot: false
  });
  
  // Sources input
  const [sources, setSources] = useState([]);
  const [sourceInput, setSourceInput] = useState("");

  // Predefined folders
  const defaultFolders = ["Legal", "Customer", "Products", "Sales", "Finance"];
  const [folders, setFolders] = useState([...defaultFolders]);
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState({});

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle agent selection
  const toggleAgent = (agentId) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };
  
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

      router.push("/"); 
    } catch (err: any) {
      console.log(err.message);
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
          alert(`Error uploading files in ${folder}: ${result.error}`);
        }
      }
    }
    
    alert("Setup completed successfully!");
    setTimeout(() => {
      window.location.replace("/"); // Forces a full reload
    }, 0);
  };

  // Move to next step
  const nextStep = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (formData.location && formData.type) {
        setStep(2);
      } else {
        alert("Please fill out all required fields.");
      }
    } else if (step === 2) {
      if (selectedAgents.length > 0) {
        setStep(3);
      } else {
        alert("Please select at least one agent.");
      }
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full overflow-hidden text-center px-4 bg-[#151221]">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      <div className="relative z-10 w-full max-w-3xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
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
          <div className="w-10 h-1 bg-gray-600 mx-2 self-center"></div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                step === 2 ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              2
            </div>
            <span className="text-gray-300 ml-2">Choose Persona</span>
          </div>
          <div className="w-10 h-1 bg-gray-600 mx-2 self-center"></div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                step === 3 ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              3
            </div>
            <span className="text-gray-300 ml-2">Setup Workspace</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={nextStep} className="space-y-4">
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

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4 overflow-y-scroll scroll-bar pr-2 h-[60vh]">
            <h3 className="text-white text-lg font-semibold mb-4">Choose Your Agents</h3>
            
            {/* Agent Selection Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  onClick={() => toggleAgent(agent.id)}
                  className={`p-2 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedAgents.includes(agent.id) 
                    ? "border-purple-500 bg-purple-900 bg-opacity-30" 
                    : "border-gray-700 hover:border-purple-400"
                  }`}
                >
                  <div className="w-24 h-24 mx-auto mb-3 bg-[#151221] rounded-lg flex items-center justify-center">
                    {/* Replace with actual images */}
                    <span className="text-3xl text-white">{agent.name.charAt(0)}</span>
                  </div>
                  <h4 className="text-white font-semibold">{agent.name}</h4>
                  <p className="text-gray-400 text-sm">{agent.role}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
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