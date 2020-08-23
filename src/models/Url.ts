import mongoose from "mongoose";
import url from "url";

export type UrlDocument = mongoose.Document & {
  originalURL: string;
  shortenURL: string;
};

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
    validate: [
      (v:string) => {
        return /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(v)
      },
      '{PATH} must be a valid URL'
    ]
  },
  shortenURL: {
    type: String,
    required: true,
    validate: [
      (v:string) => {
        if (! /^(?:http(s)?:\/\/)(pbid.io\/.*)?$/.test(v)) {
          return false;
        }

        const u = new url.URL(v);
        if (u.pathname.length != 9) {
          return false;
        }

        return true;
      },
      '{PATH} must be an URL from pbid.io domain with a pathname of length exactly equal to 8'
    ]
  }
}, { timestamps: true });

export const Url = mongoose.model<UrlDocument>("Url", urlSchema);
