import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";

// import { Url } from '../../src/models/Url';

describe("Tests concerning Shorten URL API", () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/shorten_test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
  });

  describe('POST /api/v1/urls', () => {

    it ('should return 200 OK', () => {
      return request(app).post('/api/v1/urls')
          .expect(200);        
    });
      
      
  });

  describe('GET /api/v1/urls', () => {
    
    it ('should return 200 OK', () => {
      return request(app).get('/api/v1/urls')
          .expect(200);
    });

  });

});
