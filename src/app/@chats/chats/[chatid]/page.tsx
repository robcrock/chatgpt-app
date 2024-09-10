import { getServerSession } from "next-auth";

import ChatMenu from "@/app/components/ChatMenu";

export default async function ChatMenuColumn() {
  const session = await getServerSession();
  const authenticated = !!session?.user?.email;

  return authenticated ? (
    <div className="md:min-w-1/3 w-full text-nowrap pr-5 md:w-1/3">
      <ChatMenu />
    </div>
  ) : null;
}
