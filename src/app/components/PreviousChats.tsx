import { getServerSession } from "next-auth";
import Link from "next/link";
import { Message as AIMessage } from "ai";

import { Separator } from "@/components/ui/separator";
import Transcript from "./Transcript";

import { getChatsWithMessages } from "@/db";

export default async function PreviousChats() {
  const session = await getServerSession();
  const chats = await getChatsWithMessages(session?.user?.email!);

  return (
    <div>
      {chats.length > 0 && (
        <>
          <div className="text-2xl font-bold">Previous Chat Sessions</div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {chats.map((chat) => (
              <div key={chat.id} className="m-1 rounded-xl border-2">
                <Link
                  href={`/chats/${chat.id}`}
                  className="line-clamp-1 rounded-t-lg bg-blue-900 px-5 py-2 text-lg text-white"
                >
                  {chat.name}
                </Link>
                <div className="p-3">
                  <Transcript
                    messages={
                      chat.messages.slice(0, 2) as unknown as AIMessage[]
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <Separator className="mt-5" />
        </>
      )}

      {chats.length === 0 && (
        <div className="flex justify-center">
          <div className="text-2xl italic text-gray-500">
            No previous chats.
          </div>
        </div>
      )}
    </div>
  );
}
