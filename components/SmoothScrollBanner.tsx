"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface SmoothScrollBannerProps {
  /** Scroll distance (px) over which the clip animation plays */
  scrollHeight?: number;
  /** Background image URL for desktop view */
  desktopImage: string;
  /** Background image URL for mobile view */
  mobileImage: string;
  /** Initial clip inset percentage */
  initialClipPercentage?: number;
  /** Final clip extent percentage */
  finalClipPercentage?: number;
  /** Overlay content rendered on top of the image */
  children?: React.ReactNode;
}

export default function SmoothScrollBanner({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
}: SmoothScrollBannerProps) {
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100]
  );
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const bgSizePct = useTransform(scrollY, [0, scrollHeight + 500], [170, 100]);
  // Height-driven sizing so the image always covers the full viewport height
  const backgroundSize = useMotionTemplate`auto ${bgSizePct}%`;

  const overlayOpacity = useTransform(
    scrollY,
    [scrollHeight * 0.5, scrollHeight * 0.85],
    [0, 1]
  );

  return (
    <div
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <motion.div
        className="sticky top-0 h-screen w-full bg-[#141210]"
        style={{ clipPath, willChange: "transform, opacity" }}
      >
        {/* Mobile background */}
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Desktop background */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {children && (
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
