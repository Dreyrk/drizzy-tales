import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: [true, "Please provide a pseudo"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  watchlist: {
    animes: { type: Array },
    mangas: { type: Array },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
