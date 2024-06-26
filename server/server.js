/* =========================== MODULES =========================== */

/* ========== CONNECTION MODULE ========== */
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

/* ========== SECURITY MODULE ========== */
import bcrypt from "bcryptjs";

/* ========== ENVIRONMENT VARIABLES ========== */
dotenv.config();

/* ========== CONNECT EXPRESS, CORS ========== */
const app = express(); // Initialize express
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

/* ========== EXTRACT KEYS FROM ENV FILE ========== */
const uri = process.env.MONGODB_KEY;

/* ========== CONNECT TO MONGODB ========== */
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function initializeMongoClient() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error Connecting To MongoDB: ", error);
  }
}

initializeMongoClient().catch(console.dir);

/* ========== GLOBAL VARIABLES FOR MONGODB DATABASE, COLLECTION  ========== */
const database = client.db("lms-management-system");
const userCollection = database.collection("Users");

/* ========== EXPRESS SIGNUP CONFIGURATION ========== */
app.post("/client/signup", async (req, res) => {
  try {
    // GET THE VALUES FROM THE CLIENT (JSON.stringify)
    const { username, email, password, role} = req.body;

    // VALIDATE FORM DATA
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Invalid form data" });
    } else if (role !== "user") {
      return res.status(400).json({ message: "Invalid role" });
    }
    // HASH THE PASSWORD BEFORE SAVING TO DATABASE
    const hashedPasword = await bcrypt.hash(password, 10);

    // CREATE UNIQUE INDEXES ON USERNAME AND EMAIL
    await userCollection.createIndex({ email: 1 }, { unique: true });

    // INSERT THE USER INTO THE DATABASE
    const insert = await userCollection.insertOne({
      username,
      email,
      password: hashedPasword,
      role,
    });

    // CHECK IF THE USER WAS INSERTED SUCCESSFULLY
    if (insert.acknowledged === true) {
      return res.status(200).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "Failed to insert data" });
    }
  } catch (error) {
    console.error("Error handling form submission:", error);

    // CHECK IF THE ERROR IS A DUPLICATE KEY ERROR IN OTHER TERMS TO CHECK IF THE USER ALREADY EXISTS
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      console.error("Error handling form submission:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
});

// ================ LOGIN VALIDATION ==================

app.post("/client/login", async (req, res) => {
  try {
    // RETRIEVE THE DATA FROM THE DATABASE
    const user = await client
      .db("lms-management-system")
      .collection("Users")
      .findOne({ email: req.body.email });

    if (user) {
      // COMPARE THE PASSWORD WITH STORED PASSWORD BY DECRYPTING THE STORED PASSWORD
      const passwordMatches = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (passwordMatches) {
        // PASSWORD IS CORRECT
        return res.status(200).json({ message: "Password Match" });
      } else {
        // PASSWORD IS INCORRECT
        res.status(401).json({ error: "Failed to insert data" });
      }
    } else {
      // User not found
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// METHODS TO SEND BACK TO CLIENT
// res.json({ message: "Signup route" });
// res.status(200).json({ message: "Signup route" });
// res.send("Signup route");

app.listen(5001, () => console.log("Server started on http://localhost:5001"));
