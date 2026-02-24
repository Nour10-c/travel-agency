const request = require('supertest');
const app = require('../src/app'); // Importe l'app Express
const User = require('../src/models/User');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connexion à une DB de test (utilisez une DB séparée pour éviter de polluer la prod)
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/travel-agency-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Nettoie la DB de test
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });

  it('should login a user', async () => {
    // D'abord, enregistre un user
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});