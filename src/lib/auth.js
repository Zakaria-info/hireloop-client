import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_DB_URI;
const dbName = process.env.AUTH_DB_NAME || 'hireloop';
const authSecret = process.env.AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

if (!mongoUri) {
  throw new Error('MONGO_DB_URI environment variable is not set');
}

if (!authSecret) {
  throw new Error('AUTH_SECRET environment variable is not set');
}

const client = new MongoClient(mongoUri);

// Ensure client connects when needed
client.connect().catch(err => console.error('MongoDB connection error:', err));

export const auth = betterAuth({
  database: mongodbAdapter(client.db(dbName), {
    client: client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update once per day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session-token",
      attributes: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "seeker",
      }
    }
  },

  baseURL: baseURL,
  secret: authSecret,
  trustHost: true,
});
