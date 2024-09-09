"use server";

import OpenAI from "openai";
import { getServerSession } from "next-auth";

import { createChat, updateChat } from "@/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(
  id: number | null,
  messageHistory: {
    role: "user" | "assistant";
    content: string;
  }[],
) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as {
      role: "user" | "assistant";
      content: string;
    },
  ];

  const session = await getServerSession();

  let chatId = id;
  if (!chatId) {
    console.log("not chatId", chatId);
    if (session?.user?.email) {
      chatId = await createChat(
        session.user.email,
        messageHistory[0].content,
        messages,
      );
    } else {
      throw new Error("User email is required to create a chat");
    }
  } else {
    console.log("udpateChat", chatId);
    await updateChat(chatId, messages);
  }

  return {
    messages,
    id: chatId,
  };
}
