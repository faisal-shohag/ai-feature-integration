"use client";
import React, { useEffect } from "react";
import { useTransform, useMotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/gemeni-effect";

export function GeminiEffect() {
  const animationProgress = useMotionValue(0);

  useEffect(() => {
    let startTime = null;
    const duration = 10000; // Duration of one cycle in milliseconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Map elapsed time to a smooth sine wave oscillation between 0 and 1
      const progress = (Math.sin((elapsed / duration) * Math.PI * 2) + 1) / 2;
      animationProgress.set(progress);

      // Loop the animation
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame); // Clean up on component unmount
  }, [animationProgress]);

  // Map `animationProgress` to each path length with different ranges
  const pathLengthFirst = useTransform(animationProgress, [0, 1], [0.2, 1.2]);
  const pathLengthSecond = useTransform(animationProgress, [0, 1], [0.15, 1.2]);
  const pathLengthThird = useTransform(animationProgress, [0, 1], [0.1, 1.2]);
  const pathLengthFourth = useTransform(animationProgress, [0, 1], [0.05, 1.2]);
  const pathLengthFifth = useTransform(animationProgress, [0, 1], [0, 1.2]);

  return (
    <div className="h-[420px]  w-full  rounded-md relative overflow-clip">
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
