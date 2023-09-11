"use server";

import { connect } from "@/dbConfig/db";
import Messages from "@/models/messageModel";

export default async function getMessages() {
  try {
    await connect();
    const data = await Messages.find({}).lean();
    const messages = data.map((message) => ({
      ...message,
      _id: message._id.toString(),
      user: {
        ...message.user,
        id: message.user.id.toString(),
      },
    }));
    return messages;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}
