"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileUp,
  Linkedin,
  Facebook,
  MessageCircle,
  X,
  Clock10,
} from "lucide-react";
import TiptapEditor from "./TipTapEditor";
import exportContentAsPdf from "@/lib/generatePdf";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import LinkedInModal from "./linkedIn/LinkedInModal";

const FormattingPanel = ({
  isOpen,
  onClose,
  initialContent,
  isMailMode = false,
  salesMagnet = false,
}) => {
  const [formattedContent, setFormattedContent] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [isSalesMagnetEnabled, setIsSalesMagnetEnabled] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [showPromptPopup, setShowPromptPopup] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [pendingSharePlatform, setPendingSharePlatform] = useState(null);
  const [scheduleLater, setScheduleLater] = useState(false);
  const [scheduledAt, setScheduledAt] = useState();
  const [isLinkedInModalOpen, setLinkedInModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignName, setSelectedCampaignName] = useState<
    string | null
  >(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/campaign");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch campaigns");

        setCampaigns(data.campaigns || []);
      } catch (error: any) {
        console.error("Fetch Error:", error);
        toast.error(error.message || "Error loading campaigns");
      }
    };

    fetchCampaigns();
  }, []);

  // Update formattedContent whenever initialContent changes
  useEffect(() => {
    if (initialContent) {
      setFormattedContent(initialContent);
    }
  }, [initialContent]);

  const copyFormattedText = async () => {
    // Include the title
    const contentWithTitle = `<h2>${contentTitle}</h2>\n\n${formattedContent}`;

    // Create a Blob with HTML content type
    const htmlBlob = new Blob([contentWithTitle], { type: "text/html" });

    // Create a ClipboardItem with the HTML blob
    const clipboardItem = new ClipboardItem({
      "text/html": htmlBlob,
      "text/plain": new Blob([contentWithTitle], { type: "text/plain" }),
    });

    // Write to clipboard with format
    await navigator.clipboard.write([clipboardItem]);
  };

  const copyPlainText = () => {
    // Create a temporary DOM element
    const tempElement = document.createElement("div");
    tempElement.innerHTML = formattedContent;

    // Extract plain text
    const plainText = tempElement.textContent || tempElement.innerText;

    // Include title in plain text copy
    const contentWithTitle = `${contentTitle}\n\n${plainText}`;

    // Copy to clipboard
    navigator.clipboard.writeText(contentWithTitle);
  };

  const handlePostClick = (platform) => {
    if (isSalesMagnetEnabled) {
      setPendingSharePlatform(platform);
      setShowPromptPopup(true);
    } else {
      // Regular sharing without SalesMagnet
      performShare(platform);
    }
  };

  const performShare = async (platform) => {
    let shareUrl = "";
    let salesMagnetLink = "";
    let contentWithTitle = "";
    let feedId = "";

    // 1. Handle SalesMagnet logic (if enabled)
    if (isSalesMagnetEnabled) {
      try {
        const response = await fetch("/api/feed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            content: formattedContent,
            prompt: promptValue,
            campaign: selectedCampaignName,
          }),
        });

        const data = await response.json();
        const { feed } = data;
        feedId = feed?.id;

        salesMagnetLink = `http://localhost:3001/sales-magnet/${user?.id}/${feed?.id}`;

        contentWithTitle = `<h2>${contentTitle}</h2>\n\n${formattedContent}\n\nCheckout: <a>${salesMagnetLink}</a>`;

        const htmlBlob = new Blob([contentWithTitle], { type: "text/html" });
        const clipboardItem = new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": new Blob([contentWithTitle], { type: "text/plain" }),
        });

        await navigator.clipboard.write([clipboardItem]);
      } catch (error) {
        console.error("Error creating draft:", error);
      }
    }

    // 2. Platform-specific share handling
    switch (platform) {
      case "linkedin":
        shareUrl = "https://www.linkedin.com/post/new";
        copyFormattedText();
        break;

      case "facebook":
        // Post to Facebook using your API
        try {
          const response = await fetch("/api/facebook/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: isSalesMagnetEnabled
                ? contentWithTitle
                    .replace(/<(?!\/?a(?=>|\s.*>))[^>]*>/g, "")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                : formattedContent
                    .replace(/<(?!\/?a(?=>|\s.*>))[^>]*>/g, "")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">"),
              feedId,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            toast.success("Posted to Facebook successfully!");
          } else {
            console.error("Post failed:", data.error);
            toast.error("Failed to post on Facebook.");
          }
        } catch (err) {
          console.error("Request error:", err);
          alert("Something went wrong.");
        }

        break;

      case "discord":
        shareUrl = "https://discord.com/channels/@me";
        copyPlainText();
        break;

      default:
        return;
    }

    // 3. Open share link
    // window.open(shareUrl, "_blank");

    // 4. Reset UI state
    setShowPromptPopup(false);
    setPromptValue("");
  };

  const handlePromptSubmit = () => {
    if (pendingSharePlatform) {
      performShare(pendingSharePlatform);
    }
  };

  const sendEmail = () => {
    const htmlBlob = new Blob([formattedContent], { type: "text/html" });

    // Create a ClipboardItem with the HTML blob
    const clipboardItem = new ClipboardItem({
      "text/html": htmlBlob,
      "text/plain": new Blob([formattedContent], { type: "text/plain" }),
    });
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(formattedContent)}`; // Changed to use formatted content directly
    window.location.href = mailtoLink;
  };

  const scheduleForLater = async () => {
    try {
      const response = await fetch("/api/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          content: formattedContent,
          prompt: promptValue,
          ...(scheduledAt ? { scheduledOn: scheduledAt } : {}),
          campaign: selectedCampaignName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Scheduled successfully!");
        setShowPromptPopup(false);
        setPromptValue("");
        setScheduledAt(null);
        setScheduleLater(false);
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to schedule. Please try again.");
      console.error("Schedule error:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1], // Smooth cubic bezier easing
            }}
            className={`lg:flex flex-col ${
              isMailMode ? "w-3/4" : "w-11/12"
            } bg-[#1E1E2D] p-4 !text-white border-l border-zinc-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-white"
                onClick={() => {
                  onClose();
                  setContentTitle("");
                }}
              >
                ✕
              </button>

              <div className="flex items-center space-x-4">
                {/* SalesMagnet Toggle */}
                {!isMailMode && (
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={isSalesMagnetEnabled}
                        onChange={() =>
                          setIsSalesMagnetEnabled(!isSalesMagnetEnabled)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      <span className="ml-3 text-sm font-medium text-white">
                        SalesMagnet
                      </span>
                    </label>
                  </div>
                )}

                {!isMailMode && (
                  <button
                    className="text-white bg-purple-600 flex items-center py-2 rounded-md relative group overflow-hidden"
                    onClick={() => exportContentAsPdf(formattedContent)}
                  >
                    <motion.div
                      initial={{ width: "40px" }}
                      whileHover={{ width: "150px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center justify-start px-3"
                    >
                      <FileUp
                        size={18}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="opacity-0 group-hover:opacity-100 text-sm whitespace-nowrap ml-2"
                      >
                        Export as PDF
                      </motion.span>
                    </motion.div>
                  </button>
                )}
              </div>
            </div>

            {isMailMode ? (
              <>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="email"
                      placeholder="To: recipient@example.com"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      className="w-3/4 p-2 ml-12 bg-transparent text-white border border-zinc-700 rounded"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Enter subject "
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-3/4 p-2 ml-12 bg-transparent text-white border border-zinc-700 rounded"
                    />
                  </div>
                </div>

                {/* Mail Mode Editor */}
                <div className="h-3/4 overflow-y-auto scroll-bar">
                  <TiptapEditor
                    content={formattedContent}
                    setContent={setFormattedContent}
                    editorOptions={{ immediatelyRender: false }}
                  />
                </div>
              </>
            ) : (
              // Two-column layout when not in mail mode
              <div className="flex flex-row h-3/4">
                {/* Left Column: Editor and Title Field */}
                <div className="w-1/2 pr-4 flex flex-col">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Add title for your content"
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      className="w-full p-2 bg-transparent text-white border border-zinc-700 rounded"
                    />
                  </div>
                  <div className="flex-grow overflow-y-auto scroll-bar border border-zinc-700 rounded">
                    <TiptapEditor
                      content={formattedContent}
                      setContent={setFormattedContent}
                      editorOptions={{ immediatelyRender: true }}
                    />
                  </div>
                </div>

                {/* Right Column: Preview */}
                <div className="w-1/2 pl-4 border-l border-zinc-700">
                  <div className="h-full overflow-y-auto scroll-bar p-4 bg-zinc-800 rounded">
                    {contentTitle && (
                      <h2 className="text-xl font-bold mb-4">{contentTitle}</h2>
                    )}
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex justify-between items-center space-x-2 mt-4 p-2 border-t border-gray-600">
              {!isMailMode && (
                <>
                  <div className="flex items-center space-x-2">
                    <a
                      onClick={() => {
                        // handlePostClick()
                        // setLinkedInModalOpen(true)
                      }}
                      className="text-white bg-[#0077B5] hover:bg-[#0077B5]/90 focus:ring-4 focus:outline-none focus:ring-[#0077B5]/50 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:focus:ring-[#0077B5]/55 mb-2 cursor-pointer"
                      title="Post on LinkedIn + Ctrl V"
                    >
                      <Linkedin size={18} />
                    </a>

                    <a
                      onClick={() => {
                        handlePostClick("facebook");
                      }}
                      className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:focus:ring-[#3b5998]/55 mb-2 cursor-pointer"
                      title="Post on Facebook + Ctrl V"
                    >
                      <Facebook size={18} />
                    </a>

                    <a
                      // onClick={() => handlePostClick("discord")}
                      className="text-white bg-[#7289DA] hover:bg-[#7289DA]/90 focus:ring-4 focus:outline-none focus:ring-[#7289DA]/50 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:focus:ring-[#7289DA]/55 mb-2 cursor-pointer"
                      title="Post on Discord + Ctrl V"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>

                  <button
                    className="ml-auto text-purple-600 border border-purple-600 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-800 hover:text-white transition-colors"
                    onClick={() => {
                      setScheduleLater(true);
                      setShowPromptPopup(true);
                    }}
                  >
                    <Clock10 size={18} />
                    <span className="text-sm">Schedule for later</span>
                  </button>
                </>
              )}

              {isMailMode && (
                <button
                  className="w-32 text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-violet-700 mb-2 cursor-pointer"
                  onClick={sendEmail}
                >
                  ✉️ Send Mail
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt Popup Modal */}
      <AnimatePresence>
        {showPromptPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-300"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-b from-[#1a1730] to-[#151221] p-8 rounded-xl shadow-2xl border border-purple-900/30 w-full max-w-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"></div>

              <button
                onClick={() => {
                  setScheduleLater(false);
                  setShowPromptPopup(false);
                  setScheduledAt(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {scheduleLater
                    ? "Enter prompt and date-time"
                    : "Enter Your SalesMagnet Prompt"}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="prompt"
                    className="text-sm font-medium text-purple-200 block"
                  >
                    Prompt
                  </label>
                  <textarea
                    id="prompt"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className={`w-full ${scheduleLater ? "h-14" : "h-32"} px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="campaign"
                    className="text-sm font-medium text-purple-200 block"
                  >
                    Select Campaign
                  </label>
                  <select
                    id="campaign"
                    value={selectedCampaignName ?? ""}
                    onChange={(e) => setSelectedCampaignName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      -- Select Campaign --
                    </option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.name}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </div>

                {scheduleLater && (
                  <div className="space-y-2">
                    <label
                      htmlFor="datetime"
                      className="text-sm font-medium text-purple-200 block"
                    >
                      Schedule Date & Time
                    </label>
                    <input
                      id="datetime"
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setScheduleLater(false);
                      setShowPromptPopup(false);
                      setScheduledAt(null);
                    }}
                    className="px-5 py-2.5 bg-[#2d2844] hover:bg-[#3a3456] text-white rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (scheduleLater) {
                        scheduleForLater();
                      } else {
                        handlePromptSubmit();
                      }
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-600 hover:to-violet-500 text-white font-medium rounded-lg shadow-lg shadow-purple-900/30 transition-all duration-200 flex items-center justify-center disabled:opacity-70"
                  >
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <LinkedInModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setLinkedInModalOpen(false)}
      />
    </>
  );
};

export default FormattingPanel;
