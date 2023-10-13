import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      pseudo: {
        type: String,
        required: [true, "Please provide user pseudo in message"],
      },
      email: {
        type: String,
        required: [true, "Please provide user email in message"],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    text: {
      type: String,
      required: [true, "Please provide a text in message"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    auto: {
      type: String,
      enum: ["add", "remove"],
    },
  },
  {
    timestamps: true,
  }
);

const Messages =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Messages;
