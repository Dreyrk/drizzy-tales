"use server";

import { connect } from "@/dbConfig/db";
import Messages from "@/models/messageModel";
import { revalidatePath } from "next/cache";

export default async function updateMessage(message) {
  try {
    await connect();
    await Messages.create(message);
    revalidatePath("/chat");
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}
