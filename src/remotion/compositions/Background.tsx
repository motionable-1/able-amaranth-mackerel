import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Background: React.FC<{
  variant?: "intro" | "feature" | "cta";
}> = ({ variant = "intro" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Floating gradient orbs
  const orb1X = Math.sin(time * 0.3) * 80;
  const orb1Y = Math.cos(time * 0.2) * 60;
  const orb2X = Math.cos(time * 0.25) * 100;
  const orb2Y = Math.sin(time * 0.35) * 70;

  const bgColor = variant === "cta" ? "#004E56" : "#FFFFFF";
  const orbColor1 =
    variant === "cta"
      ? "rgba(255,224,27,0.15)"
      : "rgba(0,78,86,0.06)";
  const orbColor2 =
    variant === "cta"
      ? "rgba(255,224,27,0.1)"
      : "rgba(255,224,27,0.08)";

  // Subtle grid
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.04], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, overflow: "hidden" }}>
      {/* Floating gradient orbs */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbColor1}, transparent 70%)`,
          left: `calc(20% + ${orb1X}px)`,
          top: `calc(10% + ${orb1Y}px)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbColor2}, transparent 70%)`,
          right: `calc(10% + ${orb2X}px)`,
          bottom: `calc(15% + ${orb2Y}px)`,
          filter: "blur(50px)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOpacity,
          backgroundImage:
            variant === "cta"
              ? "radial-gradient(rgba(255,224,27,0.5) 1px, transparent 1px)"
              : "radial-gradient(rgba(0,78,86,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </AbsoluteFill>
  );
};
