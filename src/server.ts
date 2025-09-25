import cors from "cors";
import dotenv from "dotenv";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";

import { startServer } from "@HM/prisma";
import authRoutes from "@HM/users/routes/authRoutes";

import "@HM/interface/override.types";

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: "*" })); // Allow all origins; restrict as needed
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

// Basic route
app.get("/", (_, res) => res.send("Hotel Management Backend Running"));

// Global error handler
app.use((err: Error, _: express.Request, res: express.Response) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

startServer(app);
