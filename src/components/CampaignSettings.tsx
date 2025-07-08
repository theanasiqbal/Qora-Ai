"use client";
import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TiptapEditor from "./TipTapEditor";

interface Campaign {
  id: string;
  name: string;
  description: string;
  active: boolean;
  platform?: string | undefined;
  template?: string;
}

export default function CampaignSettings() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    platform: "",
  });
  const [loadingToggles, setLoadingToggles] = useState<Record<string, boolean>>(
    {}
  );
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(
    null
  );
  const [loadingCampaign, setLoadingCampaign] = useState(false)

  const campaignsPerPage = 5;

  // ✅ Fetch campaigns from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoadingCampaign(true)
        const res = await fetch("/api/campaign");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch campaigns");

        setCampaigns(data.campaigns || []);
        setLoadingCampaign(false)
      } catch (error: any) {
        console.error("Fetch Error:", error);
        toast.error(error.message || "Error loading campaigns");
      } finally{
        setLoadingCampaign(false)
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, campaigns]);

  const paginatedCampaigns = useMemo(() => {
    const start = (currentPage - 1) * campaignsPerPage;
    return filteredCampaigns.slice(start, start + campaignsPerPage);
  }, [filteredCampaigns, currentPage]);

  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  const handleToggle = async (id: string) => {
    const updatedCampaign = campaigns.find((c) => c.id === id);
    if (!updatedCampaign) return;

    const newStatus = !updatedCampaign.active;
    setLoadingToggles((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`/api/campaign/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, active: newStatus } : c))
      );

      toast.success(`Campaign ${newStatus ? "activated" : "deactivated"}`);
    } catch (error: any) {
      console.error("Toggle Error:", error);
      toast.error("Failed to update campaign status");
    } finally {
      setLoadingToggles((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleAddCampaign = async () => {
    const { name, description, platform } = newCampaign;

    if (!name.trim() || !description.trim()) {
      toast.error("Please enter both name and description.");
      return;
    }

    try {
      const res = await fetch("/api/campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, platform }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setCampaigns((prev) => [data.campaign, ...prev]);
      setNewCampaign({ name: "", description: "", platform: "" });
      setDialogOpen(false);
      toast.success("Campaign added successfully!");
      setCurrentPage(1);
    } catch (error: any) {
      console.error("Add Campaign Error:", error);
      toast.error(error.message || "Failed to add campaign");
    }
  };

  const handleEditTemplate = (campaign: Campaign & { template?: string }) => {
    setTemplateModalOpen(true);
    setFormattedContent(campaign.template || "");
    setEditingCampaignId(campaign.id);
  };

  const handleSaveTemplate = async () => {
    if (!editingCampaignId) return;

    try {
      const res = await fetch(`/api/campaign/${editingCampaignId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template: formattedContent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update template");

      // Update local state
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaignId ? { ...c, template: formattedContent } : c
        )
      );

      toast.success("Template updated successfully!");
      setTemplateModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Error saving template");
    }
  };

  return (
    <div className="text-left space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">Campaigns</h2>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              Add Campaign
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#1a1725] border border-purple-700">
            <h3 className="text-xl font-semibold mb-4 text-white">
              New Campaign
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Campaign Name</label>
                <Input
                  placeholder="Enter campaign name"
                  value={newCampaign.name}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Description</label>
                <Textarea
                  placeholder="Enter campaign description"
                  value={newCampaign.description}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Channel
                </label>
                <Select
                  value={newCampaign.platform}
                  onValueChange={(value) =>
                    setNewCampaign({ ...newCampaign, platform: value })
                  }
                >
                  <SelectTrigger className="bg-[#211c35] border border-purple-900/50 text-white focus:ring-2 focus:ring-purple-600">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1725] text-white border-purple-700">
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAddCampaign}
                className="w-full bg-purple-600"
              >
                Save Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Input
        placeholder="Search campaigns..."
        className="bg-[#151221] text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="text-gray-300 text-sm border-b border-gray-600">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Channel</th>
              <th className="text-center p-2">Status</th>
              <th className="text-center p-2">Template</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCampaigns ? paginatedCampaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b border-[#2a273a] text-white hover:bg-[#211d30]"
              >
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.description}</td>
                <td className="p-2">
                  {c?.platform
    ? c.platform.charAt(0).toUpperCase() + c.platform.slice(1)
    : "N/A"}
                </td>
                <td className="p-2 text-center">
                  <Switch
                    checked={c.active}
                    disabled={loadingToggles[c.id]}
                    onCheckedChange={() => handleToggle(c.id)}
                    className={
                      loadingToggles[c.id]
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </td>
                <td className="text-center p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditTemplate(c)}
                  >
                    {c?.template ? "Edit Template" : "Add Template"}
                  </Button>
                </td>
              </tr>
            )) : loadingCampaign && (<div>Loading campaigns...</div>)}
            {paginatedCampaigns.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-4">
                  No campaigns found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <Dialog open={templateModalOpen} onOpenChange={setTemplateModalOpen}>
        <DialogContent className="bg-[#1a1725] border border-purple-700 text-white max-w-4xl">
          <h3 className="text-xl font-semibold mb-4">Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Tiptap Editor */}
            <div>
              <label className="text-sm mb-2 block text-gray-300">Editor</label>
              <div className="h-64 overflow-y-auto border border-purple-700 rounded bg-[#211c35]">
                <TiptapEditor
                  content={formattedContent}
                  setContent={setFormattedContent}
                  editorOptions={{ immediatelyRender: true }}
                />
              </div>
            </div>

            {/* Right: Preview */}
            <div>
              <label className="text-sm mb-2 block text-gray-300">
                Preview
              </label>
              <div
                className="w-full h-64 bg-[#211c35] text-white p-4 border border-purple-700 overflow-y-auto rounded prose prose-invert"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="ghost"
              className="text-gray-400"
              onClick={() => setTemplateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} className="bg-purple-600">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
