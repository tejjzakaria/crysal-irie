import mongoose from 'mongoose';

// Global cached connection for serverless
let cachedConnection = null;

export async function connectToDatabase() {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    // Connect to MongoDB with connection pooling
    const connection = await mongoose.connect(mongoURI, {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    cachedConnection = connection;
    return connection;
  } catch (error) {
    throw new Error(`MongoDB Connection Error: ${error.message}`);
  }
}
