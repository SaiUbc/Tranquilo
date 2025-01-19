'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Keyboard } from 'lucide-react'

export function JournalInput() {
  const router = useRouter()
  const [showTextInput, setShowTextInput] = useState(false)

  const startRecording = () => {
    router.push('/record')
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        {showTextInput ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Write about your day..."
              className="min-h-[200px] min-w-[400px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowTextInput(false)}>
                Cancel
              </Button>
              <Button>Save Entry</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <Button
                size="lg"
                onClick={startRecording}
              >
                <Mic className="h-5 w-5 mr-2" />
                Start Recording
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowTextInput(true)}
              >
                <Keyboard className="h-5 w-5 mr-2" />
                Write Instead
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

