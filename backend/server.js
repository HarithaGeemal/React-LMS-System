import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhook , stripeWebhook} from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import { userRouter } from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// connect to the mongoDB database
await connectDB();
connectCloudinary();

// middlewares

app.use(cors());
app.use(clerkMiddleware());


// Routes
app.get('/', (req, res) => {
    res.send('API working')
})
app.post('/clerk',express.json(),clerkWebhook);
app.use('/api/educator', express.json() , educatorRouter);
app.use('/api/course', express.json() , courseRouter);
app.use('/api/user', express.json() , userRouter);
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhook);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
