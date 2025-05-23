import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  title: string;
  content: string; 
  owner: mongoose.Types.ObjectId;
  sharedWith: mongoose.Types.ObjectId[];
  organization?: string;
  history: { content: string; updatedAt: Date }[];
}

const DocumentSchema = new Schema<IDocument>({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  organization: { type: String },
  history: [
    {
      content: { type: String },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model<IDocument>("Document", DocumentSchema);
