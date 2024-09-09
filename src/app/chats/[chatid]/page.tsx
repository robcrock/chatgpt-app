import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import Chat from "@/app/components/Chat";

import { getChat } from "@/db";

export const dynamic = "force-dynamic";

export default async function ChatDetails({
  params: { chatid },
}: {
  params: { chatid: string };
}) {
  const chat = await getChat(parseInt(chatid));

  console.log("chat", chat);

  if (!chat) {
    return notFound();
  }

  const session = await getServerSession();
  if (!session || session?.user?.email !== chat?.user_email) {
    return redirect("/");
  }

  return (
    <main className="pt-5">
      <Chat
        id={parseInt(chatid)}
        key={parseInt(chatid)}
        messages={chat?.messages || []}
      />
    </main>
  );
}
