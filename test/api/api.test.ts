import mongoose from "mongoose";
import { Url } from '../../src/models/Url';

describe("Tests concerning Shorten URL API", () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/shorten_test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
  });

});
