"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { ParseResult } from "../types";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { Printer, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { File as FileIcon } from "lucide-react";

// @ts-expect-error ewfe
const MotionHeader = motion.create(DialogHeader);
const MotionTitle = motion.create(DialogTitle);

export default function UploadAudit({
  setParseResults,
  parseResults,
}: {
  setParseResults: (results: ParseResult) => void;
  parseResults: ParseResult | null;
}) {
  const [step, setStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length == 1) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/html": [".html", ".htm"],
    },
    maxFiles: 1,
    onDrop,
  });
  const STOPS = [0.6, 2.7, 8.9];

  useAnimationFrame((t, d) => {
    const video = videoRef.current;
    if (!video) return;
    if (Math.abs(video.currentTime - STOPS[step]) < 0.005) {
      video.pause();
    } else if (STOPS[step] > video.currentTime) {
      video.currentTime += 0.01;
    } else if (STOPS[step] < video.currentTime) {
      video.currentTime = STOPS[step];
    }
  });

  return (
    <>
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
              filter: "blur(80px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(40px)",
            }}
            exit={{
              opacity: 0,
              y: 28,
              filter: "blur(80px)",
            }}
            transition={{
              duration: 3,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="fixed -bottom-[120%] aspect-square w-[120vw] -left-[10vw]"
          >
            <div
              className="loading-indicator blob rounded-full w-full h-full"
              style={{
                maskImage: "radial-gradient(white, white 40%, transparent 90%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <Dialog open={!parseResults}>
          <DialogContent forceMount className="focus:outline-none">
            <motion.div
              initial="initial"
              animate={videoLoaded ? "animate" : "initial"}
              transition={{
                staggerChildren: 0.08,
                delayChildren: 0.2,
              }}
              className="flex flex-col gap-8"
            >
              <MotionHeader>
                <AnimatePresence>
                  <MotionTitle
                    variants={{
                      initial: {
                        y: 20,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                      animate: {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                    }}
                    key={loading ? "Uploading" : "Upload"}
                  >
                    {loading ? "Uploading" : "Upload"} Audit
                  </MotionTitle>
                </AnimatePresence>
              </MotionHeader>
              <AnimatePresence>
                {loading ? (
                  <div className="w-[29rem] relative h-96">
                    {/* <LoadingBlob x={[-330, 0, -330]} y={[-40, -280, -40]} xDuration={25} yDuration={18} /> */}
                    <LoadingBlob
                      key="blob-1"
                      x={[-230, -100, -230]}
                      y={[-120, -200, -120]}
                      xDuration={14}
                      yDuration={15}
                    />
                    <LoadingBlob
                      key="blob-2"
                      x={[-80, -250, -80]}
                      y={[-200, -160, -200]}
                      xDuration={14}
                      yDuration={8}
                    />
                    <LoadingBlob
                      key="blob-3"
                      x={[-90, -220, -90]}
                      y={[-200, -120, -200]}
                      xDuration={6}
                      yDuration={12}
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-[29rem] relative aspect-[1.7] rounded-md overflow-hidden">
                      <AnimatePresence>
                        <motion.video
                          src="/save-audit.mov"
                          key="video"
                          playsInline
                          muted
                          ref={videoRef}
                          onLoadedData={() => {
                            setVideoLoaded(true);
                          }}
                          variants={{
                            initial: {
                              opacity: 0,
                              scale: 0.96,
                              y: 8,
                              filter: "blur(12px)",
                            },
                            animate: {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              filter: "blur(0px)",
                              transition: {
                                delay: 0.35,
                              },
                            },
                            exit: {
                              opacity: 0,
                              scale: 1.1,
                              filter: "blur(12px)",
                            },
                          }}
                          initial="initial"
                          animate={showVideo ? "animate" : "exit"}
                          className="absolute inset-0 w-full origin-center"
                        />
                        <motion.div
                          variants={{
                            initial: {
                              scale: 0.96,
                              opacity: 0,
                              filter: "blur(8px)",
                            },
                            animate: {
                              scale: 1,
                              opacity: 1,
                              filter: "blur(0px)",
                            },
                          }}
                          initial="initial"
                          animate={showVideo ? "initial" : "animate"}
                          className="absolute inset-0 flex justify-center items-center"
                        >
                          <div
                            className={`w-full h-full border-[6px] border-dashed rounded-lg flex justify-center items-center transition-all ${
                              isDragActive
                                ? "border-violet-500"
                                : "border-zinc-800"
                            }`}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <AnimatePresence>
                              {file ? (
                                <>
                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                      y: 28,
                                      filter: "blur(80px)",
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                      filter: "blur(40px)",
                                      rotate: [0, 360],
                                    }}
                                    exit={{
                                      opacity: 0,
                                      y: 28,
                                      filter: "blur(80px)",
                                    }}
                                    transition={{
                                      duration: 3,
                                      delay: 0.2,
                                      ease: "easeOut",
                                      rotate: {
                                        repeat: Infinity,
                                        ease: "linear",
                                        duration: 25,
                                      },
                                    }}
                                    layoutId="blob-1"
                                    className="absolute -bottom-[160%] aspect-square w-[160%] -z-10"
                                  >
                                    <div
                                      className="bg-gradient-to-br from-violet-600 via-purple-700 to-pink-800 blob w-full h-full"
                                      style={
                                        {
                                          // maskImage: "radial-gradient(white, white 10%, transparent 70%)"
                                        }
                                      }
                                    />
                                  </motion.div>
                                  <div className="flex flex-row gap-2 items-center text-zinc-400">
                                    <FileIcon className="size-4" />
                                    <p className="text-sm">{file.name}</p>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                      }}
                                    >
                                      <X className="size-4 hover:text-white" />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <Upload
                                  className={`transition-all ${
                                    isDragActive
                                      ? "text-violet-500 size-10"
                                      : "text-zinc-400 size-6"
                                  }`}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                        {!isDragActive && !file && (
                          <motion.h2
                            variants={{
                              initial: {
                                y: step == 0 ? 12 : 0,
                                filter: "blur(8px)",
                                opacity: 0,
                                x: "-50%",
                              },
                              animate: {
                                y: 0,
                                filter: "blur(0px)",
                                opacity: 1,
                              },
                              exit: {
                                y: 2,
                                filter: "blur(4px)",
                                opacity: 0,
                              },
                            }}
                            key={`heading-${step}`}
                            className="font-medium text-center whitespace-nowrap inline-block text-sm text-zinc-200 absolute bottom-4 bg-background/80 backdrop-blur-md border-border border px-2 py-1 rounded-md left-1/2"
                          >
                            {step == 0 ? (
                              "Open your degree audit."
                            ) : step == 1 ? (
                              <>
                                Open the{" "}
                                <span className="text-blue-400 underline font-semibold whitespace-nowrap">
                                  <Printer className="inline-block size-4 align-text-top" />{" "}
                                  Printer Friendly
                                </span>{" "}
                                version.
                              </>
                            ) : step == 2 ? (
                              "Download as HTML Only"
                            ) : (
                              "Upload the file here!"
                            )}
                          </motion.h2>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      transition={{
                        staggerChildren: 0.04,
                        delayChildren: 1.2,
                        staggerDirection: -1,
                      }}
                      key="buttons-container"
                      className="flex w-full justify-center items-center relative"
                    >
                      <motion.button
                        variants={{
                          initial: {
                            filter: "4px",
                            opacity: 0,
                            y: 12,
                          },
                          animate: {
                            filter: "0px",
                            opacity: 1,
                            y: 0,
                          },
                          exit: {
                            filter: "4px",
                            opacity: 0,
                            y: 12,
                          },
                        }}
                        onClick={() => {
                          if (step == 3) {
                            setShowVideo(true);
                          }
                          setStep(step - 1);
                        }}
                        className="text-zinc-600 absolute left-0 hover:text-zinc-400 transition-colors"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        variants={{
                          initial: {
                            filter: "4px",
                            opacity: 0,
                            y: 12,
                          },
                          animate: {
                            filter: "0px",
                            opacity: 1,
                            y: 0,
                          },
                          exit: {
                            filter: "4px",
                            opacity: 0,
                            y: 12,
                          },
                          hover: {
                            scale: 1.03,
                            y: -2,
                          },
                        }}
                        whileHover="hover"
                        onClick={async () => {
                          if (step == 3 && file) {
                            setLoading(true);
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch("/parse", {
                              method: "POST",
                              body: formData,
                            }).then((r) => r.json());
                            setTimeout(() => {
                              setParseResults(res);
                            }, 10000);
                          } else if (step == 2) {
                            setShowVideo(false);
                            setStep(3);
                          } else {
                            setShowVideo(true);
                            setStep(step + 1);
                          }
                        }}
                        autoFocus
                        className="rounded-full w-fit mx-auto bg-gradient-to-b from-violet-700 to-violet-800 px-6 py-2 border-2 border-white/20 text-lg focus:outline-none"
                      >
                        <span className="text-white mix-blend-plus-lighter">
                          Next
                        </span>
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </>
  );
}

function LoadingBlob({
  x,
  y,
  xDuration,
  yDuration,
}: {
  x: number[];
  y: number[];
  xDuration: number;
  yDuration: number;
}) {
  return (
    <div className="w-1 h-1 left-1/2 top-1/2 absolute">
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(40px)",
        }}
        animate={{
          opacity: 1,
          y,
          x,
          filter: "blur(20px)",
          rotate: [0, 360],
        }}
        exit={{
          opacity: 0,
          filter: "blur(80px)",
        }}
        transition={{
          duration: 3,
          delay: 0.2,
          ease: "easeOut",
          rotate: {
            repeat: Infinity,
            ease: "linear",
            duration: (xDuration + yDuration) / 2,
          },
          x: {
            repeat: Infinity,
            ease: "easeInOut",
            duration: xDuration,
          },
          y: {
            repeat: Infinity,
            ease: "easeInOut",
            duration: yDuration,
          },
        }}
        className="aspect-square size-80 absolute"
      >
        <div
          className="bg-gradient-to-br from-violet-600 via-purple-700 to-pink-800 blob w-full h-full"
          style={
            {
              // maskImage: "radial-gradient(white, white 10%, transparent 70%)"
            }
          }
        />
      </motion.div>
    </div>
  );
}
