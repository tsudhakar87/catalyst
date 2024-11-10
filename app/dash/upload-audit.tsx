import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ParseResult } from "../types";
import { AnimatePresence } from "framer-motion";
import { Printer } from "lucide-react";

export default function UploadAudit({
  setParseResults,
  parseResults,
}: {
  setParseResults: (results: any) => void;
  parseResults: ParseResult | null;
}) {
  const [step, setStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const STOPS = [0, 2, 9];
    if (!videoRef.current) return;
    if (step == 3) {
      videoRef.current.play();
      setShowVideo(false);
    } else {
      const video = videoRef.current;
      const curTime = video.currentTime;
      video.play();
      setTimeout(() => {
        video.play();
      }, STOPS[step] - curTime * 1000);
    }
  }, [step]);

  return (
    <AnimatePresence>
      <Dialog open={!parseResults}>
        <DialogContent forceMount>
          <DialogHeader>
            <DialogTitle>Upload Audit</DialogTitle>
          </DialogHeader>
          <h2>
            {step == 0 ? (
              "Open your degree audit"
            ) : step == 1 ? (
              <>
                Open the{" "}
                <span className="text-blue-500 underline font-semibold">
                  <Printer className="inline-block size-6 align-text-top" />{" "}
                  Printer Friendly
                </span>{" "}
                version
              </>
            ) : step == 2 ? (
              "Download as HTML Only"
            ) : (
              "Upload the file here"
            )}
          </h2>
          {step < 3 && (
            <video
              src="/save-audit.mp4"
              playsInline
              muted
              ref={videoRef}
              style={{
                display: showVideo ? "block" : "none",
              }}
            ></video>
          )}
          <button
            onClick={() => {
              setStep(step + 1);
            }}
            className="rounded-full w-fit mx-auto bg-gradient-to-b from-violet-700 to-violet-800 px-4 py-1 border-2 border-white/20 text-lg"
          >
            <span className="text-white mix-blend-plus-lighter">Next</span>
          </button>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
