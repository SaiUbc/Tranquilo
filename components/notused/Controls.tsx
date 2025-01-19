"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "../ui/button";
import { Mic, MicOff, Phone, Keyboard, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "../ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "../ui/card";


export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [isTyping, setIsTyping] = useState(false);
  const [entry, setEntry] = useState("");

  const toggleTyping = () => {
    setIsTyping(!isTyping);
  }

  const handleSubmit = () => {
    // Here you would handle the text submission
    console.log("Submitted entry:", entry)
    setEntry("")
    setIsTyping(false)
  }

  return (
    <div
      className={
        cn(
          "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
          "bg-gradient-to-t from-card via-card/90 to-card/0",
        )
      }
    >
      {isTyping ? (
        <Card className="relative">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Type your journal entry here..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="min-h-[200px] min-w-[400px] resize-none"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={toggleTyping}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!entry.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : ( <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-4"} />
              ) : (
                <Mic className={"size-4"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>
            
            <Button
              size="lg"
              variant="outline"
              onClick={toggleTyping}
              className="h-16 w-16 rounded-full"
            >
              <Keyboard className="h-6 w-6" />
              <span className="sr-only">Type Instead</span>
            </Button>

            <Button
              className={"flex items-center gap-1"}
              onClick={() => {
                disconnect();
              }}
              variant={"destructive"}
            >
              <span>
                <Phone
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span>End Call</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>)}
    </div>
  );
}
