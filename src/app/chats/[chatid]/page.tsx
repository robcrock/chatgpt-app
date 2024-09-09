import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import Chat from "@/app/components/Chat";
import { getChat } from "@/db";

export const dynamic = "force-dynamic";

export default async function ChatDetails({
  params,
}: {
  params: { chatid: string };
}) {
  const chat = await getChat(parseInt(params.chatid));

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
        id={parseInt(params.chatid)}
        key={parseInt(params.chatid)}
        messages={chat?.messages || []}
      />
    </main>
  );
}
