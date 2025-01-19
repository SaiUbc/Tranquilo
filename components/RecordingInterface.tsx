'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, PhoneOff, Volume2 } from 'lucide-react';
import { cn } from '@/utils';
import { SentimentBars } from './sentiment-bars';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  sentiments?: {
    emotion: string;
    score: number;
    color: string;
  }[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hi there! How are you feeling today?',
    sender: 'assistant',
  },
];

interface RecordingInterfaceProps {
  onClose: () => void;
}

export function RecordingInterface({ onClose }: RecordingInterfaceProps) {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  let recognition: SpeechRecognition | null = null;

  // Initialize Web Speech API
  if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => preprocessTranscript(prev + event.results[i][0].transcript));
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  const preprocessTranscript = (rawText: string) => {
    let processedText = rawText.trim();

    // Capitalize first letter of sentences
    processedText = processedText
      .split('. ')
      .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase())
      .join('. ');

    // Add punctuation if missing
    if (processedText && !/[.!?]$/.test(processedText)) {
      processedText += '.';
    }

    // Remove filler words
    const fillerWords = ['uh', 'um', 'like', 'you know'];
    const fillerRegex = new RegExp(`\\b(${fillerWords.join('|')})\\b`, 'gi');
    processedText = processedText.replace(fillerRegex, '').replace(/\s+/g, ' ');

    return processedText;
  };

  const startListening = () => {
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  // Initialize voices for Text-to-Speech
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakText = (text: string) => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find((voice) => voice.name === selectedVoice) || null;
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const addMessage = () => {
    if (transcript) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: transcript,
        sender: 'user',
      };
      setMessages((prev) => [...prev, newUserMessage]);
      setTranscript('');

      setTimeout(() => {
        const assistantResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for sharing. How else can I assist you today?",
          sender: 'assistant',
        };
        setMessages((prev) => [...prev, assistantResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-h-[calc(100vh-4rem)] bg-background">
      <Card className="flex-1 mx-4 my-4 border rounded-xl overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-8">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col gap-2">
                <div
                  className={cn(
                    'flex w-full max-w-[80%] flex-col gap-2',
                    message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2',
                      message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    {message.text}
                  </div>
                </div>
                {message.sender === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 ml-2"
                    onClick={() => speakText(message.text)}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="sr-only">Speak message</span>
                  </Button>
                )}
              </div>
            ))}
            {transcript && (
              <div className="flex w-full max-w-[80%] ml-auto">
                <div className="rounded-lg bg-primary/50 px-4 py-2 text-primary-foreground">{transcript}</div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="flex justify-between items-center gap-4">
              <Button
                size="lg"
                className={cn('flex-1', isListening && 'bg-red-500 hover:bg-red-600')}
                onClick={isListening ? stopListening : startListening}
              >
                <Mic className="h-5 w-5 mr-2" />
                {isListening ? 'Stop Recording' : 'Start Recording'}
              </Button>
              <Button size="lg" variant="destructive" onClick={onClose}>
                <PhoneOff className="h-5 w-5 mr-2" />
                End Call
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedVoice || undefined} onValueChange={setSelectedVoice}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addMessage} disabled={!transcript}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
