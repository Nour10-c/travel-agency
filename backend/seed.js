require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Trip = require('./src/models/Trip');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Trip.deleteMany({});

    // Sample users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin'
      }
    ];

    await User.insertMany(users);
    console.log('Users inserted');

    // Sample trips
    const trips = [
      {
        destination: 'Paris, France',
        price: 1200,
        dates: {
          start: new Date('2023-07-01'),
          end: new Date('2023-07-10')
        },
        description: 'A romantic trip to the City of Light, including Eiffel Tower and Louvre Museum.'
      },
      {
        destination: 'Tokyo, Japan',
        price: 1500,
        dates: {
          start: new Date('2023-08-15'),
          end: new Date('2023-08-25')
        },
        description: 'Explore the vibrant culture of Tokyo, from Shibuya to traditional temples.'
      },
      {
        destination: 'New York, USA',
        price: 1000,
        dates: {
          start: new Date('2023-09-01'),
          end: new Date('2023-09-07')
        },
        description: 'Experience the hustle of NYC, visiting Times Square, Central Park, and Broadway.'
      },
      {
        destination: 'Bali, Indonesia',
        price: 800,
        dates: {
          start: new Date('2023-10-10'),
          end: new Date('2023-10-20')
        },
        description: 'Relax on beautiful beaches and discover ancient temples in Bali.'
      }
    ];

    await Trip.insertMany(trips);
    console.log('Trips inserted');

    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
