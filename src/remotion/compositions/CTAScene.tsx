import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import {
  FadeInChars,
  FadeInWords,
} from "../library/components/text/TextAnimation";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/mailchimp/1773082046541_1aa1xlhzorzh_mailchimp_logo.png";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CTA Button
  const btnScale = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 10, stiffness: 140, mass: 1 },
    durationInFrames: 30,
  });
  const btnOpacity = interpolate(frame, [35, 48], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Logo at bottom
  const logoOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const logoScale = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 18, stiffness: 100, mass: 1 },
    durationInFrames: 25,
  });

  // Button pulse
  const pulseScale = 1 + Math.sin(frame / 12) * 0.02;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative stars */}
      {[
        { left: 200, top: 180, size: 12, delay: 0 },
        { left: 900, top: 220, size: 8, delay: 5 },
        { left: 350, top: 480, size: 10, delay: 10 },
        { left: 1050, top: 420, size: 14, delay: 3 },
        { left: 180, top: 550, size: 6, delay: 8 },
      ].map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: "#FFE01B",
            borderRadius: "50%",
            opacity:
              interpolate(
                frame,
                [20 + star.delay, 30 + star.delay],
                [0, 0.6],
                { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
              ) *
              (0.5 + Math.sin(frame / 10 + i) * 0.5),
            transform: `translateY(${Math.sin(frame / 15 + i * 2) * 8}px)`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,224,27,0.4)`,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        {/* Main CTA headline */}
        <FadeInChars
          startFrom={5}
          stagger={0.025}
          duration={0.5}
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 850,
            textWrap: "balance",
          }}
        >
          Start Growing Your Business Today
        </FadeInChars>

        {/* Subtitle */}
        <FadeInWords
          startFrom={22}
          stagger={0.06}
          duration={0.4}
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            maxWidth: 650,
          }}
        >
          Join millions of businesses using Mailchimp to reach their goals
        </FadeInWords>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale * pulseScale})`,
            backgroundColor: "#FFE01B",
            color: "#231E15",
            padding: "18px 52px",
            borderRadius: 26,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.02em",
            boxShadow:
              "0 4px 24px rgba(255,224,27,0.4), 0 0 0 1px rgba(35,30,21,0.1)",
          }}
        >
          Start Free Trial
        </div>

        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginTop: 16,
          }}
        >
          <Img
            src={LOGO_URL}
            style={{
              width: 200,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
