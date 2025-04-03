"use client";
import { useState } from "react";
import Carousel from "@/components/Carousel";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const [formData, setFormData] = useState({
    agentName: "",
    tone: "",
    language: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [agent, setAgent] = useState("");

  const tones = ["Professional", "Casual", "Friendly", "Serious", "Energetic"];
  const languages = ["English", "Hindi", "Urdu", "Punjabi", "Bengali"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      agentName: "",
      tone: "",
      language: "",
    })
    toast.success("Agent settings saved successfully!");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full overflow-hidden text-center bg-[#151221]">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] top-[16%] left-[40%]"></div>

      {/* Settings Content */}
      <div className={`relative z-10 ${showForm ? "max-w-4xl" : "w-full"} bg-[#1a1725] p-8 rounded-xl shadow-lg`}>
        {!showForm ? (
          <>
            <h2 className="text-white text-2xl font-bold mb-6">Craft Your AI Persona</h2>
            <Carousel
              stop={true}
              setAgent={(selectedAgent) => {
                setAgent(selectedAgent);
                setFormData({ ...formData, agentName: selectedAgent });
                setShowForm(true);
              }}
            />
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mb-2  bg-violet-600 p-1 rounded-lg font-semibold  text-xs transition-all duration-300 absolute left-8"
            >
              <ArrowLeft />
            </button>

            <h2 className="text-white text-2xl font-bold mb-6">Customize {agent}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Agent Name Field */}
              <div>
                <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                  What would you like to call the Agent?
                </label>
                <input
                  type="text"
                  name="agentName"
                  placeholder="Enter agent name"
                  value={formData.agentName}
                  onChange={handleChange}
                  className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Tone Selection */}
                <div>
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Select the Tone of the Agent
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a tone</option>
                    {tones.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
                    Select the Language of the Agent
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a Language</option>
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition-all duration-300"
              >
                Save Settings
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
