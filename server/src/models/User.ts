import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "owner" | "editor" | "viewer";
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["owner", "editor", "viewer"], default: "editor" },
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
