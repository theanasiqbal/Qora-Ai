"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Facebook, MessageCircle, X } from "lucide-react";
import TiptapEditor from "../TipTapEditor";

interface FormatterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
}

const FormatterModal = ({
  isOpen,
  onClose,
  initialContent,
}: FormatterModalProps) => {
  const [formattedContent, setFormattedContent] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Update formattedContent whenever initialContent changes
  useEffect(() => {
    if (initialContent.length) {
      setFormattedContent(initialContent);
    }
  }, [initialContent]);


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscKey);
  };
}, [isOpen, onClose]);


  const copyFormattedText = async () => {
    // Include the title
    const contentWithTitle = `<h2>${
      contentTitle || "Untitled Content"
    }</h2>\n\n${formattedContent}`;

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
    const contentWithTitle = `${
      contentTitle || "Untitled Content"
    }\n\n${plainText}`;

    // Copy to clipboard
    navigator.clipboard.writeText(contentWithTitle);
  };

  const handlePostClick = (platform: string) => {
    performShare(platform);
  };

  const performShare = async (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = "https://www.linkedin.com/post/new";
        copyFormattedText();
        break;
      case "facebook":
        shareUrl = "https://www.facebook.com/sharer/sharer.php";
        copyPlainText();
        break;
      case "discord":
        shareUrl = "https://discord.com/channels/@me";
        copyPlainText();
        break;
      default:
        return;
    }

    // Open the share URL
    window.open(shareUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 top-10 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-gradient-to-b from-[#1a1730] to-[#151221] rounded-lg shadow-xl border border-purple-900/30 w-11/12 max-w-5xl max-h-[90vh] flex flex-col !text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-700">
              <h2 className="text-xl font-semibold text-purple-300/80">Format and share content</h2>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  onClose();
                  setContentTitle("");
                }}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 flex-grow flex flex-col h-[70vh]">
              {/* Two-column layout */}
              <div className="flex flex-col md:flex-row flex-grow h-full gap-4">
                {/* Left Column: Editor and Title Field */}
                <div className="md:w-1/2 flex flex-col">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Add title for your content"
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      className="w-full p-2 bg-[#211c35] text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all rounded"
                    />
                  </div>
                  <div className="flex-grow overflow-y-auto scroll-bar bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all rounded">
                    <TiptapEditor
                      content={formattedContent}
                      setContent={setFormattedContent}
                      editorOptions={{ immediatelyRender: false }}
                    />
                  </div>
                </div>

                {/* Right Column: Preview */}
                <div className="md:w-1/2 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-purple-300/80">Preview</h3>
                  <div className="flex-grow overflow-y-auto scroll-bar p-4  bg-[#211c35] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all rounded">
                    <h2 className="text-xl font-bold mb-4">
                      {contentTitle || "Untitled Content"}
                    </h2>
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-zinc-700">
              {/* Export Button */}
              {/* <button
                className="text-white bg-purple-600 hover:bg-purple-700 flex items-center py-2 px-4 rounded-md transition-colors"
                onClick={() => exportContentAsPdf(formattedContent)}
              >
                <FileUp size={18} className="mr-2" />
                Export as PDF
              </button> */}

              {/* Share Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePostClick("linkedin")}
                  className="text-white bg-[#0077B5] hover:bg-[#0077B5]/90 focus:ring-4 focus:outline-none focus:ring-[#0077B5]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#0077B5]/55 cursor-pointer"
                  title="Post on LinkedIn + Ctrl V"
                >
                  <Linkedin size={18} className="mr-2" />
                  LinkedIn
                </button>

                <button
                  onClick={() => handlePostClick("facebook")}
                  className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 cursor-pointer"
                  title="Post on Facebook + Ctrl V"
                >
                  <Facebook size={18} className="mr-2" />
                  Facebook
                </button>

                <button
                  onClick={() => handlePostClick("discord")}
                  className="text-white bg-[#7289DA] hover:bg-[#7289DA]/90 focus:ring-4 focus:outline-none focus:ring-[#7289DA]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#7289DA]/55 cursor-pointer"
                  title="Post on Discord + Ctrl V"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Discord
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormatterModal;