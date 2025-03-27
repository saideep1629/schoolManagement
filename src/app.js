import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

app.use(cookieParser())

// routes import
import schoolRouter from "./routes/school.routes.js";

// route declaration
app.use("/eduTrust", schoolRouter)


export { app }