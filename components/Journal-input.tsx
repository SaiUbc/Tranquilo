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
  const [journalEntry, setJournalEntry] = useState('') // State to store the user's input
  const [savedEntry, setSavedEntry] = useState('') // State to store the saved result

  const startRecording = () => {
    router.push('/record')
  }

  const handleSave = () => {
    setSavedEntry(journalEntry) // Save the user's input
    setShowTextInput(false) // Hide the input form
    setJournalEntry('') // Clear the input field
  }
  console.log(savedEntry)
  console.log(journalEntry)
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        {showTextInput ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Write about your day..."
              className="min-h-[200px] min-w-[400px]"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)} // Update input state
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowTextInput(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Entry</Button>
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

        {savedEntry && ( // Display the saved entry if it exists
          <div className="mt-6">
            <h3 className="text-lg font-semibold">✨ Your Journal Entry:</h3>
            <p className="mt-2 p-4 bg-gray-100 border rounded">{savedEntry}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
