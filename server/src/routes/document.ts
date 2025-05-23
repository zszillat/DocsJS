import express, { Request, Response } from "express";
import Document from "../models/Document";
import mongoose from "mongoose";

const router = express.Router();

// CREATE Document
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, content, owner, organization } = req.body;
    const doc = new Document({ title, content, owner, organization, history: [] });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: "Failed to create document" });
  }
});

// READ (Get One Document)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Document.findById(req.params.id).populate("owner sharedWith", "username email");
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch document" });
  }
});

// UPDATE Document
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    doc.history.push({ content: doc.content, updatedAt: new Date() });
    doc.content = req.body.content ?? doc.content;
    doc.title = req.body.title ?? doc.title;
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Failed to update document" });
  }
});

// DELETE Document
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete document" });
  }
});

export default router;
