"use client";

import { useEffect, useState } from "react";
import { Upload, Globe, Plus, X, FileText, Brain } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";

export default function BrainModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("documents");
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchWebsites = async () => {
    const response = await fetch("http://localhost:3001/api/websites");
    const { websites } = await response.json();
    setWebsites(websites);
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleAddWebsite = () => {
    if (newWebsite && !websites.includes(newWebsite)) {
      setWebsites([...websites, newWebsite]);
      setNewWebsite("");
    }
  };

  const handleRemoveWebsite = (site: string) => {
    setWebsites(websites.filter((website) => website !== site));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleUpload = async () => {
    if (activeTab === "documents" && !files.length) return;

    let url = "";
    const formData = new FormData();

    if (activeTab === "documents") {
      url = `/api/upload?documents=true`;
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      setUploading(true);
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");
      alert(result.message);
      if (activeTab === "documents") setFiles([]);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleWebsiteUpload = async () => {
    const formData = new FormData();
    formData.append("websites", websites.join(", "));

    try {
      setUploading(true);
      const res = await fetch('/api/websites', {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");
      alert(result.message);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const TriggerButton = () => (
    <button
      onClick={() => setIsOpen(true)}
      className="text-white hover:text-purple-400 p-2"
      aria-label="Open Brain Modal"
    >
      <Brain className="w-5 h-5" />
    </button>
  );

  return (
    <>
      <TriggerButton />
      <Modal
        title="Knowledge Base"
        description="Upload documents or websites to train your assistant"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex border-b border-gray-800 mb-4">
          {["documents", "websites", "crm"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-purple-500" />
                <p className="text-sm text-gray-400">
                  Drag and drop your files here, or click to browse
                </p>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mt-2">
                    Upload Files
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-300">
                  Selected Files
                </h4>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#1e1c3a] p-3 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(file.name)}
                      className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#2a2845] rounded-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {activeTab === "websites" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter website URL"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddWebsite();
                  }
                }}
                className="w-full px-3 py-2 bg-[#1e1c3a] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="button"
                onClick={handleAddWebsite}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </button>
            </div>

            {websites.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-300">
                  Added Websites
                </h4>
                {websites.map((site, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#1e1c3a] p-3 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{site}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveWebsite(site)}
                      className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#2a2845] rounded-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleWebsiteUpload}
                  disabled={uploading}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  {uploading ? "Adding..." : "Add to knowledge"}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "crm" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["HubSpot", "Salesforce"].map((crm) => (
              <div
                key={crm}
                className="bg-[#1e1c3a] border border-gray-700 rounded-lg p-6"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-[#2a2845] p-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt={crm}
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{crm}</h3>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md text-white">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
