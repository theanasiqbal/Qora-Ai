'use client'
import { useEffect, useState } from 'react';
import ChatBot from "@/components/ChatBot";
import { ProfilePreview } from "@/components/ProfilePreview";
import { useTheme } from "next-themes";
import { Particles } from "@/components/Particles";

interface SalesMagnetPageProps {
  userId: string;
  feedId: string;
}

const SalesMagnetPage = ({ userId, feedId }: SalesMagnetPageProps) => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  // useEffect(() => {
  //   if (userId && feedId) {
  //     const sessionId = crypto.randomUUID();
  //     const fetchMessages = async () => {
  //       const messages = await customerRagChat.history.getMessages({
  //         amount: 10,
  //         sessionId,
  //       });
  //       setInitialMessages(messages);
  //     };
  //     fetchMessages();
  //   }
  // }, [userId, feedId]);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  if (!userId || !feedId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center overflow-x-hidden bg-[#151221] p-4 min-h-screen">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      <div className="relative z-10 w-full max-w-6xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-[75vh] bg-[#151221] rounded-lg overflow-y-scroll scroll-bar">
            <ProfilePreview userId={userId as string} salesMagnet={true} />
          </div>
          <div className="w-full md:w-1/2 h-[75vh]">
            <ChatBot
              feedId={feedId as string}
              userId={userId as string}
              sessionId={crypto.randomUUID()}
              // initialMessages={initialMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesMagnetPage;
