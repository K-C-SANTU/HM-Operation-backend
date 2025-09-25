import { PrismaClient } from "@prisma/client";
import type { Application } from "express";

import { seedInitialData } from "./seedInitData";

const prisma = new PrismaClient();
const PORT = String(Number(process.env.PORT) || 5000);

async function startServer(app: Application) {
    try {
        await prisma.$connect();
        console.log("MongoDB connected via Prisma");
        await seedInitialData();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
}

export { prisma, startServer };
