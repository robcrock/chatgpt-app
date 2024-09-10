"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import type { Message as AIMessage } from "ai";
import { useChat } from "ai/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Transcript from "./Transcript";

import { Message } from "@/types";
import { updateChat } from "@/db";

export default function Chat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null;
  messages?: Message[];
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: initialMessages as unknown as AIMessage[],
    });

  const chatId = useRef<number | null>(id);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!isLoading && messages.length) {
        const simplifiedMessages = messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }));
        const newChatId = await updateChat(chatId.current, simplifiedMessages);
        if (chatId.current === null) {
          router.push(`/chats/${newChatId}`);
          router.refresh();
        } else {
          if (typeof newChatId === "number") {
            chatId.current = newChatId;
          }
        }
      }
    })();
  }, [isLoading, messages, router]);

  return (
    <div className="flex flex-col">
      <Transcript messages={messages as AIMessage[]} truncate={false} />
      <form className="mt-3 flex" onSubmit={handleSubmit}>
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
        <Button type="submit" className="ml-3 text-xl">
          Send
        </Button>
      </form>
    </div>
  );
}
