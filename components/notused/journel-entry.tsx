"use client"

import { useEffect, useRef, useState } from "react"
import { Keyboard, Mic, MicOff, Phone, Send, Square } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/utils"
import { Toggle } from "@radix-ui/react-toggle"
// import { useVoice } from "@humeai/voice-react"
// import MicFFT from "./MicFFT";

export function JournalEntry() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [audioData, setAudioData] = useState<number[]>(Array(24).fill(0))
  const [entry, setEntry] = useState("")
  const [dots, setDots] = useState<number[]>(Array(24).fill(0))
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 64
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      setIsRecording(true)
      setIsTyping(false)
      visualize()
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsRecording(false)
    setAudioData(Array(24).fill(0))
    setDots(Array(24).fill(0))
  }

  const visualize = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    const draw = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      
      // Get every third value from the frequency data to create 24 data points
      const newData = Array.from({ length: 24 }, (_, i) => {
        const value = dataArray[i * 3] || 0
        return value / 255 // Normalize to 0-1
      })
      
      setAudioData(newData)
      // Update dots with a slight delay for visual effect
      setDots(prev => prev.map((dot, i) => {
        const target = newData[i]
        return dot + (target - dot) * 0.3
      }))

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()
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

  if (isTyping) {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="p-4">
          <div className="space-y-4">
            <Textarea
              placeholder="Type your journal entry here..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={toggleTyping}>
                Use Voice
              </Button>
              <Button onClick={handleSubmit} disabled={!entry.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 bg-muted/20 rounded-lg p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-lg bg-background"
            onClick={isRecording ? undefined : startRecording}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            <span className="sr-only">
              {isRecording ? "Recording" : "Start Recording"}
            </span>
          </Button>

          {/* <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
          </div> */}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-lg"
              onClick={toggleTyping}
            >
              <Keyboard className="h-5 w-5" />
              <span className="sr-only">Type Instead</span>
            </Button>
            <Button
              variant="destructive"
              className="rounded-lg"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              <Phone className="mr-2 h-4 w-4" />
              End Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

