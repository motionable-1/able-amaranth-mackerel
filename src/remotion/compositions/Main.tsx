import { AbsoluteFill, Audio, Sequence, Artifact, useCurrentFrame } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { push } from "../library/components/layout/transitions/presentations/push";
import { Background } from "./Background";
import { IntroScene } from "./IntroScene";
import { FeatureScene } from "./FeatureScene";
import { CTAScene } from "./CTAScene";

const { fontFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Audio
const WHOOSH_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773082050193_qpfrad0m7l_sfx_Smooth_modern_digital_whoosh_t.mp3";
const CHIME_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773082053341_u4ycduzznnc_sfx_Soft_uplifting_chime_notificat.mp3";

// Icons
const ICON_EMAIL =
  "https://api.iconify.design/ph/envelope-simple-fill.svg?color=%23FFE01B&width=48";
const ICON_LIGHTNING =
  "https://api.iconify.design/ph/lightning-fill.svg?color=%23FFE01B&width=48";
const ICON_ROCKET =
  "https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23FFE01B&width=48";

// Timeline (in frames at 30fps)
const INTRO_DUR = 120; // 4s
const FEATURE1_DUR = 110; // ~3.7s
const FEATURE2_DUR = 110;
const FEATURE3_DUR = 110;
const CTA_DUR = 120; // 4s
const TRANSITION_DUR = 18; // 0.6s per transition

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // Calculate when each transition starts for SFX timing
  const t1Start = INTRO_DUR - TRANSITION_DUR;
  const t2Start = t1Start + FEATURE1_DUR - TRANSITION_DUR;
  const t3Start = t2Start + FEATURE2_DUR - TRANSITION_DUR;
  const t4Start = t3Start + FEATURE3_DUR - TRANSITION_DUR;

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ fontFamily }}>
        {/* Background layer - white for feature scenes */}
        <Sequence durationInFrames={t4Start} premountFor={30}>
          <Background variant="intro" />
        </Sequence>

        {/* Background layer - teal for CTA */}
        <Sequence from={t4Start} premountFor={30}>
          <Background variant="cta" />
        </Sequence>

        {/* Main scene transitions */}
        <TransitionSeries>
          {/* Scene 1: Intro */}
          <TransitionSeries.Sequence durationInFrames={INTRO_DUR}>
            <IntroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={push("left")}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 2: Feature 1 - Email & SMS */}
          <TransitionSeries.Sequence durationInFrames={FEATURE1_DUR}>
            <FeatureScene
              icon={ICON_EMAIL}
              title="Email & SMS Marketing Made Easy"
              description="Intuitive drag-and-drop tools that make creating stunning campaigns effortless — no expertise required."
              featureNumber="01"
              accentSide="left"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 3: Feature 2 - AI Automations */}
          <TransitionSeries.Sequence durationInFrames={FEATURE2_DUR}>
            <FeatureScene
              icon={ICON_LIGHTNING}
              title="AI-Powered Automations That Drive Sales"
              description="Personalized, high-impact campaigns on autopilot — powered by smart data and machine learning."
              featureNumber="02"
              accentSide="right"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={push("left")}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 4: Feature 3 - Migration */}
          <TransitionSeries.Sequence durationInFrames={FEATURE3_DUR}>
            <FeatureScene
              icon={ICON_ROCKET}
              title="Seamless Migration & Dedicated Onboarding"
              description="Switch platforms effortlessly with hands-on support from our expert onboarding team."
              featureNumber="03"
              accentSide="left"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 5: CTA */}
          <TransitionSeries.Sequence durationInFrames={CTA_DUR + 30}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Sound effects on transitions */}
        <Sequence from={t1Start} premountFor={5}>
          <Audio src={WHOOSH_SFX} volume={0.3} />
        </Sequence>
        <Sequence from={t2Start} premountFor={5}>
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
        <Sequence from={t3Start} premountFor={5}>
          <Audio src={WHOOSH_SFX} volume={0.3} />
        </Sequence>
        <Sequence from={t4Start} premountFor={5}>
          <Audio src={CHIME_SFX} volume={0.35} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
