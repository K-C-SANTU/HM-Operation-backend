import express from "express";
import rateLimit from "express-rate-limit";

import { login } from "@HM/users/controllers/authController";
import { loginSchema, validate } from "@HM/users/middleware/joiValidationMiddleware";

const router = express.Router();

// Rate limiter: max 100 requests per 15 min per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
});

router.post("/login", limiter, validate(loginSchema), login);

export default router;
