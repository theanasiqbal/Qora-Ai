import LinkedInConnectButton from "@/components/linkedIn/LinkedInConnectButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkedInModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Connect to LinkedIn</h2>

        {/* 🔁 Use your button here */}
        <LinkedInConnectButton />

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
