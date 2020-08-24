import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";
import { Url, UrlDocument } from '../../src/models/Url';

const http = request(app);
const API_URL = '/api/v1/urls';

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

    it ('should return 20 when the original URL is not valid', async () => {
      const invalid = {
        originalURL: "troubleshooting"
      };

      const response = await http.post(API_URL)
        .send(invalid);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid original URL");
    });

    it ('should return 20 when the original URL already exists', () => {

    });

    it ('should create a valid shorten URL when is a new valid original URL', async () => {
      const valid = {
        originalURL: "https://microk8s.io/docs/troubleshooting"
      };

      const response = await http.post(API_URL)
        .send(valid);

      expect(response.status).toBe(201);
      expect(response.body.message).toBeDefined();
      expect(response.body.url).toBeDefined();
      expect(response.body.url._id).toBeDefined();
      expect(response.body.url.originalURL).toBe(valid.originalURL);
      expect(response.body.url.shortenURL).toBeDefined();
    });
      
  });

  describe('GET /api/v1/urls', () => {
    
    it ('should return 200 OK', () => {
      return request(app).get('/api/v1/urls')
          .expect(201);
    });

  });

});
