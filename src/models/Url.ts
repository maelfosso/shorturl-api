import mongoose from "mongoose";
import { props } from "bluebird";

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
      '{PATH} must be an URL'
    ]
  },
  shortenURL: {
    type: String,
    required: true,
    // validate: [
    //   (v:string) => {
    //     // return /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(v)

    //     // return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]twitter+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(v)
    //     return /^(?:http(s)?:\/\/)[a-z0-9]+([\-\.]pbid.io\/.*)?$/.test(v)
    //   },
    //   '{PATH} must be an URL of pbid.io domain'
    // ]
  }
}, { timestamps: true });

export const Url = mongoose.model<UrlDocument>("Url", urlSchema);
