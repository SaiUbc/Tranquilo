'use client';

import { useRouter } from 'next/navigation'
import EmotionDashboard from "@/components/Dashboard";
import { RecordingInterface } from '@/components/RecordingInterface';
import { CharacterPrompt } from '@/components/character-prompt';
import { JournalInput } from '@/components/Journal-input';

export default async function Page() {
  const router = useRouter();

  return (
    <div className={"grow flex flex-col"}>
      <main className="min-h-screen bg-background flex flex-col items-center justify-center">
        <CharacterPrompt />
        <JournalInput />
        {/* <EmotionDashboard /> */}
      </main>
    </div>
  );
}
