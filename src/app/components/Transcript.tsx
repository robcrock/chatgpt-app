import type { Message as AIMessage } from "ai";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export default function Transcript({
  messages,
  truncate = true,
}: {
  messages: AIMessage[];
  truncate?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${message.role === "user" ? "bg-blue-500" : "bg-green-500"} rounded-md px-8 py-2`}
          >
            {truncate ? truncateText(message.content, 200) : message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
