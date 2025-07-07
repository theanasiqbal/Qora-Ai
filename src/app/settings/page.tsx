"use client";
import { useState } from "react";
import AgentSettings from "@/components/AgentSettings";
import CampaignSettings from "@/components/CampaignSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"agent" | "campaign">("agent");

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen py-10 overflow-hidden bg-[#151221] text-center">
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]" />
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] top-[16%] left-[40%]" />

      {/* Tab Header */}
      <div className="relative z-10 mb-3 flex space-x-2">
        <button
          onClick={() => setActiveTab("agent")}
          className={`px-3 py-1 rounded-xl font-semibold border-b-purple-900 transition ${
            activeTab === "agent" ? "bg-purple-500 text-white" : "bg-[#1a1725] text-gray-300"
          }`}
        >
          Agent Settings
        </button>
        <button
          onClick={() => setActiveTab("campaign")}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            activeTab === "campaign" ? "bg-purple-600 text-white" : "bg-[#1a1725] text-gray-300"
          }`}
        >
          Campaign Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 w-full max-w-6xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
        {activeTab === "agent" ? <AgentSettings /> : <CampaignSettings />}
      </div>
    </div>
  );
}
