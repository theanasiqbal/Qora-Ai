"use server";

import { cookies } from "next/headers";
import crypto from "crypto";

export async function getOrSetChatId() {
  let chatId = cookies().get("chatId")?.value;

  if (!chatId) {
    chatId = crypto.randomUUID(); // Generate a new chatId if not in cookies
    cookies().set("chatId", chatId, { path: "/", maxAge: 86400 }); // Set cookie
  }

  return chatId;
}