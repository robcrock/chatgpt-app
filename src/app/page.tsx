import { Separator } from "@/components/ui/separator";
import Chat from "./components/Chat";
import { getServerSession } from "next-auth";
import PreviousChats from "./components/PreviousChats";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome To GPT Chat</h1>
      {!session?.user?.name && <div>You need to log in to use this chat.</div>}
      {session?.user?.name && (
        <>
          <Suspense fallback={<div>Loading previous chats...</div>}>
            <PreviousChats />
          </Suspense>
          <h4 className="text-2xl font-bold">New Chat</h4>
          <Separator className="my-5" />
          <Chat />
        </>
      )}
    </main>
  );
}
