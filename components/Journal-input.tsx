'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Keyboard } from 'lucide-react'
import { LocalStorage } from 'node-localstorage';

export function JournalInput() {
  const router = useRouter()
  const [showTextInput, setShowTextInput] = useState(false)
  const [journalEntry, setJournalEntry] = useState('') // State to store the user's input
  const [savedEntry, setSavedEntry] = useState('') // State to store the saved result
  const [result, setResult] = useState(''); // State to store the LLM result

  // const [postResponse, setPostResponse] = useState('')

  

  // Initialize node-localstorage (store data in a directory named 'storage')
  const localStorage = new LocalStorage('./storage');

  const startRecording = () => {
    router.push('/record')
  }

  const handleSave = () => {
    setSavedEntry(journalEntry) // Save the user's input
    setShowTextInput(false) // Hide the input form
    setJournalEntry('') // Clear the input field

    // console.log("Saved Entry:", savedEntry)
    const makePostRequest = async (saved: string) => {
            const url = 'http://127.0.0.1:8003/process';
            const data = {
                user_input: journalEntry,
            };
        
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                const result = await response.json();
                result.final_response = result.final_response?.response || 'No response available';
                                // Get an item
                // const userInput = localStorage.getItem('userInput') || 'No response available';
                // console.log('User input:', userInput);

                setResult(result.final_response || 'No response');
                localStorage.setItem('llmResponse', result.final_response);
              } catch (error) {
                  console.error("Error making POST request:", error.message);
                  setResult('Error fetching response');
              }
          };
          
          makePostRequest(savedEntry);



  }
  console.log(savedEntry)
  // console.log(journalEntry)
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
        {result && ( // Display the LLM result if it exists
          <div className="mt-6">
            <h3 className="text-lg font-semibold">✨ LLM Response:</h3>
            <Textarea
              className="min-h-[400px] min-w-[600px] bg-gray-100 border rounded"
              readOnly
              value={result} // Show the result in the text box
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
