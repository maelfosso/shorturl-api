import mongoose from "mongoose";

export type UrlDocument = mongoose.Document & {
  originalURL: string;
  shortenURL: string;
};

const urlSchema = new mongoose.Schema({
  originalURL: String,
  shortenURL: String
}, { timestamps: true });

export const Url = mongoose.model<UrlDocument>("Url", urlSchema);
