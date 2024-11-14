import React, { Dispatch, SetStateAction } from "react";
import PlayPauseToggler from "./PlayPauseToggler";
import StepForwardButton from "./StepForwardButton";
import ReplayAudioButton from "./ReplayAudioButton";

import PauseTouchArea from "./PauseTouchArea";
import { motion, AnimatePresence } from "framer-motion";
import TranslationToggler from "./TranslationToggler";
import CloseButton from "./CloseButton";
import { MonitorPause } from "lucide-react";
import HideButton from "./HideButton";

type AudioControlsProps = {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  isReplaying?: boolean;
  onReplay?: () => void;
  onNext?: () => void;
  showTranslation: boolean;
  onShowTranslation: () => void;
  setShowAutoPausePlayer: Dispatch<SetStateAction<boolean>>;
  setScrollLyricIntoView?: Dispatch<SetStateAction<boolean>>;
  type: "standard" | "auto-pause";
};

export default function AudioControlsV2({
  isPlaying = false,
  onPlayPause = () => {},
  isReplaying = false,
  onReplay,
  onNext,
  showTranslation,
  onShowTranslation,
  setShowAutoPausePlayer,
  setScrollLyricIntoView,
  type = "standard",
}: AudioControlsProps) {
  function handleHideAutoPausePlayer() {
    if (type !== "auto-pause") return;
    if (!setShowAutoPausePlayer || !setScrollLyricIntoView) return;
    setShowAutoPausePlayer(false);
    setScrollLyricIntoView((prev) => !prev);
  }

  return (
    <div>
      <AnimatePresence>
        {!isReplaying && !isPlaying && (
          <div className="opacity-95 z-50">
            {type === "standard" && <CloseButton route="/upload-audio" />}
            {type === "auto-pause" && (
              <HideButton
                handleHideAutoPausePlayer={handleHideAutoPausePlayer}
              />
            )}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full fixed bottom-0 left-0 right-0 px-1 pb-3"
            >
              <div className="mx-auto bg-gradient-to-r from-zinc-700 via-zinc-700 to-zinc-600 rounded-3xl px-5 py-5 flex justify-between items-center">
                <TranslationToggler
                  showTranslation={showTranslation}
                  onShowTranslation={onShowTranslation}
                />

                {type === "standard" && (
                  <>
                    <PlayPauseToggler
                      isPlaying={isPlaying}
                      onPlayPause={onPlayPause}
                    />

                    <button
                      onClick={() => setShowAutoPausePlayer((prev) => !prev)}
                    >
                      <MonitorPause size={32} color="white" />
                    </button>
                  </>
                )}

                {type === "auto-pause" && onReplay && onNext && (
                  <>
                    <StepForwardButton onPlaySingleLyric={onNext} />
                    <ReplayAudioButton onReplay={onReplay} />
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <PauseTouchArea
        isPlaying={isPlaying}
        isReplaying={isReplaying}
        onPlayPause={onPlayPause}
        onReplay={onReplay || (() => {})}
      />
    </div>
  );
}
