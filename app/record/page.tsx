'use client'

import { useRouter } from 'next/navigation'
import { RecordingInterface } from "@/components/RecordingInterface"

export default function RecordPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RecordingInterface onClose={() => router.push('/')} />
    </div>
  )
}

