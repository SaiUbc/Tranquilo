import { JournalEntryy } from "@/components/je";
import { JournalEntry } from "@/components/journel-entry";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className={"grow flex flex-col"}>
      
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg space-y-8">
          <Chat accessToken={accessToken} />
            {/* <JournalEntry /> */}
            {/* <JournalEntryy /> */}
          </div>
      </main>
    </div>
  );
}
