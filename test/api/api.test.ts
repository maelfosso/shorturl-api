import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";
import { Url } from '../../src/models/Url';

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

  afterEach(async () => {
    await Url.deleteMany({});
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

    it ('should return 20 when the original URL already exists', async () => {
      const valid = {
        originalURL: "https://microk8s.io/docs/troubleshooting"
      };

      const invalid = {
        originalURL: "https://microk8s.io/docs/troubleshooting"
      };

      let response = await http.post(API_URL)
        .send(valid);
      expect(response.status).toBe(201);

      response = await http.post(API_URL)
        .send(invalid);
      expect(response.status).toBe(406);
      expect(response.body.message).toBeDefined();
      expect(response.body.message).toBe("URL already shortens");
      expect(response.body.url).not.toBeDefined();
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
          .expect(200);
    });

    it ('should returns all the saved shorten urls', async () => {
      let valid = {
        originalURL: "https://microk8s.io/docs/troubleshooting"
      };
      let response = await http.post(API_URL)
        .send(valid);
      expect(response.status).toBe(201);
      
      valid = {
        originalURL: "https://www.udemy.com/course/valaxy-devops/"
      };
      response = await http.post(API_URL)
        .send(valid);
      expect(response.status).toBe(201);

      response = await http.get(API_URL);
      expect(response.status).toBe(200);
      expect(response.body.urls.length).toBe(2);
    });

  });

});
