import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import ContactRouter from './routes/ContactRouter.js';
import { errorHandler } from "./middleware/errorhandler.js";
import connectDb from "./configs/dbConnection.js";
import userRoute from "./routes/userRoutes.js"


dotenv.config();
const app=express();
console.log("Hello how are you")
const port=process.env.PORT || 5002
app.use(express.json());
connectDb()
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

app.use("/api/contacts",ContactRouter);
app.use("/api/user",userRoute);
app.use(errorHandler);