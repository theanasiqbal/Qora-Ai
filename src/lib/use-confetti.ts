import { useEffect } from "react";
import confetti from "canvas-confetti";

const useConfetti = (trigger) => {
  useEffect(() => {
    if (trigger) {
      const interval = setInterval(() => {
        const originX = Math.random() > 0.5 ? 0.1 : 0.9; // 0.1 for left, 0.9 for right
        const angle = originX === 0.1 ? 45 : 120; // 45 for left-to-right, -45 for right-to-left

        confetti({
          particleCount: 10,
          angle: angle,
          spread: 70,
          origin: { x: originX, y: 0.5 }, // y = 0.5 for vertical center
        });
      }, 100);

      setTimeout(() => clearInterval(interval), 2000); // Adjust this duration as needed
    }
  }, [trigger]);
};

export default useConfetti;
