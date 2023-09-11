"use server";

import { connect } from "@/dbConfig/db";
import Messages from "@/models/messageModel";
import { revalidatePath } from "next/cache";

export default async function updateMessage(id, updatedText, updatedLikes) {
  try {
    await connect();
    const updatedMessage = await Messages.findByIdAndUpdate(
      id,
      { text: updatedText, likes: updatedLikes },
      { lean: true }
    );
    revalidatePath("/chat");
    return updatedMessage;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}
