"use client"

import { useState } from "react"
import { Mic, Square, Keyboard, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/utils"

export function JournalEntryy() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [entry, setEntry] = useState("")

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      setIsTyping(false)
      // Simulate audio levels for demo
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setAudioLevel(0)
  }

  const toggleTyping = () => {
    setIsTyping(!isTyping)
    if (isRecording) {
      stopRecording()
    }
  }

  const handleSubmit = () => {
    // Here you would handle the text submission
    console.log("Submitted entry:", entry)
    setEntry("")
    setIsTyping(false)
  }

  return (
    <Card className="relative">
      <CardContent className="p-6 space-y-4">
        {isTyping ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Type your journal entry here..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="min-h-[200px] resize-none"
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
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                onClick={isRecording ? stopRecording : startRecording}
                className={cn(
                  "h-16 w-16 rounded-full",
                  isRecording && "animate-pulse"
                )}
              >
                {isRecording ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
                <span className="sr-only">
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={toggleTyping}
                className="h-16 w-16 rounded-full"
              >
                <Keyboard className="h-6 w-6" />
                <span className="sr-only">Type Instead</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

