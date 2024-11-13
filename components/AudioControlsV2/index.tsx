import React from "react";
import PlayPauseToggler from "./PlayPauseToggler";
import StepForwardButton from "./StepForwardButton";
import ReplayAudioButton from "./ReplayAudioButton";

import PauseTouchArea from "./PauseTouchArea";
import { motion, AnimatePresence } from "framer-motion";
import TranslationToggler from "./TranslationToggler";
import CloseButton from "./CloseButton";
import { MonitorPause } from "lucide-react";

type AudioControlsProps = {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  isReplaying?: boolean;
  onReplay?: () => void;
  showTranslation: boolean;
  onShowTranslation: () => void;
  type: "standard" | "auto-pause";
};

export default function AudioControlsV2({
  isPlaying = false,
  onPlayPause = () => {},
  isReplaying = false,
  onReplay,
  showTranslation,
  onShowTranslation,
  type = "standard",
}: AudioControlsProps) {
  return (
    <div>
      <AnimatePresence>
        {!isReplaying && !isPlaying && (
          <div className="opacity-95 z-50">
            <CloseButton route="/upload-audio" />
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

                    <button>
                      <MonitorPause size={32} color="white" />
                    </button>
                  </>
                )}

                {type === "auto-pause" && onReplay && (
                  <>
                    <StepForwardButton onPlaySingleLyric={onReplay} />
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
