import mongoose from "mongoose";
import { Url, UrlDocument } from '../../src/models/Url';

describe("Tests concerning User model", () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/shorten_test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
  });

  it ('creates and saves Url successfully', async () => {
    const valid = new Url({
      originalURL: "http://pbid.io/new-file-hew-ue",
      shortenURL: "http://pbid.io/u2defa8w"
    })
    const saved = await valid.save();

    expect(saved._id).toBeDefined();
    expect(saved.originalURL).toBe(valid.originalURL);
    expect(saved.shortenURL).toBe(valid.shortenURL);
  });

  it ('reject an URL if any of its field is empty', async () => {
    const invalid = new Url({
      originalURL: '',
      shortenURL: ''
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error.errors['originalURL']).toBeDefined();
    expect(error.errors['shortenURL']).toBeDefined();
  });

});
