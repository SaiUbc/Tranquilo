import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const prompts = [
  "How was your day? What made it special or challenging?",
  "What emotions did you experience today? Let's talk about them.",
  "Tell me about a moment that stood out today.",
  "How are you feeling right now? I'm here to listen.",
]

export function CharacterPrompt() {
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
  
  return (
    <Card className="max-w-2xl mx-auto mb-8">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{randomPrompt}</p>
      </CardContent>
    </Card>
  )
}

