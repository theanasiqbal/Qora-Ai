import ChatBot from "@/components/ChatBot";
import { ProfilePreview } from "@/components/ProfilePreview";
import { customerRagChat } from "@/lib/customer-rag-chat";
import { Box } from "@mui/material";
import React from "react";

const SalesMagnetPage = async ({
  params,
}: {
  params: { userId: string; draftId: string };
}) => {
  const { userId, draftId } = params;
  const sessionId = crypto.randomUUID();
  const initialMessages = await customerRagChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <div className="relative flex flex-col items-center justify-center overflow-x-hidden bg-[#151221] p-4 min-h-screen">
      {/* Background Image Left */}
      <Box
        // ref={boxRef}
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          top: "-10%",
          right: { xs: "30%", md: "63%" },
          position: "absolute",
          width: { xs: "80%", md: "60%" },
          height: "100%",
          backgroundImage: "url('/image/hero.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          zIndex: 1,
          // opacity: inView ? 1 : 0,
          // transform: inView ? "translateX(0)" : "translateX(-100px)",
          transition: "transform 1s ease-out, opacity 1s ease-out",
        }}
      />
      {/* Background Gradient */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(113,47,255,0.15)_0%,transparent_70%)] left-[10%]"></div>

      <div className="relative z-10 w-full max-w-6xl bg-[#1a1725] p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Profile Preview */}
          <div className="w-full md:w-1/2 h-[75vh] bg-[#151221] rounded-lg overflow-y-scroll scroll-bar">
            <ProfilePreview userId={userId} salesMagnet={true} />
          </div>

          {/* Right Side - ChatBot */}
          <div className="w-full md:w-1/2 h-[75vh]">
            <ChatBot
              feedId={draftId}
              userId={userId}
              sessionId={sessionId}
              initialMessages={initialMessages}
            />
          </div>
        </div>
      </div>
      {/* Background Image Right */}
      <Box
        // ref={boxRef}
        sx={{
          top: "-10%",
          left: { xs: "center", md: "77%" },
          position: "absolute",
          width: { xs: "80%", md: "60%" },
          height: "100%",
          backgroundImage: "url('/image/hero.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          zIndex: 1,
          // opacity: inView ? 1 : 0,
          // transform: "translateX(100px)",
          transition: "transform 1s ease-out, opacity 1s ease-out",
        }}
      />
    </div>
  );
};

export default SalesMagnetPage;
