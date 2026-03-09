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
import {
  FadeInWords,
  SlideInText,
} from "../library/components/text/TextAnimation";

interface FeatureSceneProps {
  icon: string;
  title: string;
  description: string;
  featureNumber: string;
  accentSide?: "left" | "right";
}

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  icon,
  title,
  description,
  featureNumber,
  accentSide = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon entrance
  const iconScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 130, mass: 1 },
    durationInFrames: 30,
  });
  const iconOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Feature number
  const numOpacity = interpolate(frame, [5, 18], [0, 0.08], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const numScale = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: { damping: 20, stiffness: 80, mass: 1.2 },
    durationInFrames: 40,
  });

  // Accent line
  const lineHeight = interpolate(frame, [8, 35], [0, 200], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Description card background
  const cardOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardTranslateY = interpolate(frame, [15, 35], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating decoration
  const floatY = Math.sin(frame / 18) * 6;
  const floatRot = Math.sin(frame / 22) * 3;

  const isLeft = accentSide === "left";

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          fontSize: 500,
          fontWeight: 900,
          color: "#004E56",
          opacity: numOpacity,
          transform: `scale(${numScale})`,
          right: isLeft ? 80 : "auto",
          left: isLeft ? "auto" : 80,
          top: "50%",
          marginTop: -280,
          lineHeight: 1,
        }}
      >
        {featureNumber}
      </div>

      {/* Vertical accent line */}
      <div
        style={{
          position: "absolute",
          width: 4,
          height: lineHeight,
          backgroundColor: "#FFE01B",
          borderRadius: 2,
          left: isLeft ? 100 : "auto",
          right: isLeft ? "auto" : 100,
          top: "50%",
          marginTop: -100,
        }}
      />

      {/* Decorative dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#FFE01B",
            opacity: interpolate(frame, [20 + i * 5, 30 + i * 5], [0, 0.5], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
            left: isLeft ? 140 + i * 20 : "auto",
            right: isLeft ? "auto" : 140 + i * 20,
            top: `${42 + i * 8}%`,
            transform: `translateY(${floatY * (i + 1) * 0.3}px)`,
          }}
        />
      ))}

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isLeft ? "flex-start" : "flex-end",
          gap: 24,
          paddingLeft: isLeft ? 200 : 140,
          paddingRight: isLeft ? 140 : 200,
          maxWidth: 1000,
        }}
      >
        {/* Icon with glow */}
        <div
          style={{
            opacity: iconOpacity,
            transform: `scale(${iconScale}) translateY(${floatY}px) rotate(${floatRot}deg)`,
            width: 90,
            height: 90,
            backgroundColor: "#004E56",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,78,86,0.2), 0 0 0 1px rgba(0,78,86,0.05)",
          }}
        >
          <Img
            src={icon}
            style={{ width: 48, height: 48 }}
          />
        </div>

        {/* Title */}
        <SlideInText
          startFrom={10}
          direction={isLeft ? "left" : "right"}
          distance={60}
          stagger={0.04}
          duration={0.5}
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: "#004E56",
            lineHeight: 1.15,
            textAlign: isLeft ? "left" : "right",
            maxWidth: 700,
            textWrap: "balance",
          }}
        >
          {title}
        </SlideInText>

        {/* Description card */}
        <div
          style={{
            opacity: cardOpacity,
            transform: `translateY(${cardTranslateY}px)`,
            backgroundColor: "rgba(0,78,86,0.04)",
            borderRadius: 16,
            padding: "20px 28px",
            borderLeft: isLeft ? "3px solid #FFE01B" : "none",
            borderRight: isLeft ? "none" : "3px solid #FFE01B",
          }}
        >
          <FadeInWords
            startFrom={25}
            stagger={0.04}
            duration={0.4}
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#231E15",
              lineHeight: 1.5,
              textAlign: isLeft ? "left" : "right",
              maxWidth: 580,
              opacity: 0.85,
            }}
          >
            {description}
          </FadeInWords>
        </div>
      </div>
    </AbsoluteFill>
  );
};
