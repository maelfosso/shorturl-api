import mongoose from "mongoose";

export type UrlDocument = mongoose.Document & {
  originalURL: string;
  shortenURL: string;
};

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true
  },
  shortenURL: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Url = mongoose.model<UrlDocument>("Url", urlSchema);
