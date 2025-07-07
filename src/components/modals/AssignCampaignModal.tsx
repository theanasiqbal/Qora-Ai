"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { X, Megaphone  } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
}

export default function AssignCampaignModal() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      fetch("/api/campaign")
        .then((res) => res.json())
        .then((data) => setCampaigns(data?.campaigns || []))
        .catch(console.error);
    }
  }, [open]);

  const handleAssign = async () => {
    if (!selectedCampaignId) return;
    try {
      await fetch(`http://localhost:4000/lead/assign-campaign/${selectedCampaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      setOpen(false);
      setSelectedCampaignId("");
    } catch (err) {
      console.error("Failed to assign campaign:", err);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="rounded-full flex items-center justify-center p-2 hover:bg-purple-600/30">
          <Megaphone size={20} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 
          rounded-xl border border-purple-900/30 bg-gradient-to-b from-[#1a1730] to-[#151221] 
          p-6 shadow-2xl focus:outline-none"
        >
          {/* Glowing top line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600" />

          {/* Close icon */}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </Dialog.Close>

          {/* Title */}
          <Dialog.Title className="text-lg text-purple-300/90 font-semibold mb-6">
            Assign Campaign
          </Dialog.Title>

          {/* Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Select a Campaign
            </label>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 
              text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 
              focus:ring-purple-600 focus:border-transparent transition-all"
            >
              <option value="">-- Choose Campaign --</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              onClick={handleAssign}
              disabled={!selectedCampaignId}
              className="bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-600 hover:to-violet-500 
              text-white font-medium py-3 px-6 rounded-lg shadow-md shadow-purple-900/30 
              transition-all duration-200 disabled:opacity-50"
            >
              Assign
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
