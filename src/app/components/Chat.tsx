"use client";

import { getCompletion } from "@/app/server-actions/getCompletion";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null;
  messages?: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const chatId = useRef<number | null>(id);
  const router = useRouter();

  const handleClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);
    if (!chatId.current) {
      router.push(`/chats/${completions.id}`);
      router.refresh();
    }
    chatId.current = completions.id;
    setMessage("");
    setMessages(completions.messages);
  };

  return (
    <div className="flex flex-col">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`mb-5 flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md px-8 py-2`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="mt-3 flex border-t-2 border-t-gray-500 pt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <Button onClick={handleClick} className="ml-3 text-xl">
          Send
        </Button>
      </div>
    </div>
  );
}
