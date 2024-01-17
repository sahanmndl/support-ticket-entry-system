import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import supportAgentRouter from "./routes/SupportAgentRoutes.js";
import supportTicketRouter from "./routes/SupportTicketRoutes.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({limit: "30mb", extended: true}))
app.use('/api/', supportAgentRouter)
app.use('/api/', supportTicketRouter)

mongoose
    .connect(
        process.env.MONGODB_URL,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
        app.listen(process.env.PORT || 8008)
        console.log("CONNECTED TO MONGODB ON PORT 8008")
    })
    .catch((e) => console.error("CONNECTION ERROR: ", e))