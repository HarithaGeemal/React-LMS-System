import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhook } from "./controllers/webhooks.js";

const app = express();
const PORT = process.env.PORT || 5000;

// connect to the mongoDB database
await connectDB();

// middlewares

app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API working')
})
app.post('/clerk',express.json(),clerkWebhook);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
