import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  Easing,
} from "remotion";
import { FadeInWords, BlurReveal } from "../library/components/text/TextAnimation";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/mailchimp/1773082046541_1aa1xlhzorzh_mailchimp_logo.png";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance with spring
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 1 },
    durationInFrames: 30,
  });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline pill
  const pillScale = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 16, stiffness: 150, mass: 1 },
    durationInFrames: 25,
  });
  const pillOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Decorative accent bar
  const barWidth = interpolate(frame, [10, 40], [0, 180], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating shapes
  const shape1Y = Math.sin(frame / 20) * 8;
  const shape2Rot = frame * 0.8;
  const shape3Scale = 0.8 + Math.sin(frame / 25) * 0.15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative floating shapes */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 140,
          width: 20,
          height: 20,
          backgroundColor: "#FFE01B",
          borderRadius: 4,
          transform: `translateY(${shape1Y}px) rotate(${shape2Rot}deg)`,
          opacity: interpolate(frame, [20, 35], [0, 0.6], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 180,
          top: 200,
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#004E56",
          opacity: interpolate(frame, [25, 40], [0, 0.3], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          transform: `scale(${shape3Scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 140,
          bottom: 200,
          width: 24,
          height: 24,
          border: "2px solid #FFE01B",
          borderRadius: "50%",
          opacity: interpolate(frame, [30, 45], [0, 0.4], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          transform: `rotate(${-shape2Rot * 0.5}deg)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={LOGO_URL}
            style={{ width: 420, objectFit: "contain" }}
          />
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: barWidth,
            height: 4,
            backgroundColor: "#FFE01B",
            borderRadius: 2,
          }}
        />

        {/* Headline */}
        <BlurReveal
          startFrom={18}
          stagger={0.04}
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: "#004E56",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
            textWrap: "balance",
          }}
        >
          Grow Your Business with AI-Powered Marketing
        </BlurReveal>

        {/* Sub tagline pill */}
        <div
          style={{
            opacity: pillOpacity,
            transform: `scale(${pillScale})`,
            backgroundColor: "#004E56",
            color: "#FFFFFF",
            padding: "12px 32px",
            borderRadius: 26,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <FadeInWords startFrom={50} stagger={0.06} duration={0.4}>
            Email · SMS · Automations · Analytics
          </FadeInWords>
        </div>
      </div>
    </AbsoluteFill>
  );
};
