"use client";
import { useState } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
    agent: "",
    agentName: "",
    tone: "",
    language: ""
  });
  const [showExtraFields, setShowExtraFields] = useState(false);

  const agents = ["Cooper", "Oliver", "Cassie", "James"];
  const tones = ["Professional", "Casual", "Friendly", "Serious", "Energetic"];
  const languages = ["English", "Hindi", "Urdu", "Punjabi", "Bengali"]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "agent") {
      setShowExtraFields(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Agent settings saved successfully!");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[91vh] overflow-hidden text-center px-4 bg-[#151221]">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] top-[16%] left-[40%]"></div>

      {/* Settings Form */}
      <div className="relative z-10 w-full max-w-3xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6">Edit your Persona</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Selection */}
          <div>
            <label className="block mb-2 text-gray-300 text-left text-sm font-semibold">
              Choose an Agent
            </label>
            <select
              name="agent"
              value={formData.agent}
              onChange={handleChange}
              className="w-full bg-[#151221] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select an agent</option>
              {agents.map((agent) => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
          </div>

          {/* Extra Fields */}
          {showExtraFields && (
            <>
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
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
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
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition-all duration-300">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
