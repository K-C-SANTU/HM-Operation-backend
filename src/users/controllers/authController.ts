import type { User } from "@prisma/client";
import type { Request, Response } from "express";

import type { LoginRequest } from "@HM/interface/types";
import { prisma } from "@HM/prisma";
import { comparePassword, generateToken } from "@HM/users/utils/authUtils";
import { sendErrorResponse } from "@HM/utils/errorUtils";

export const login = async (req: Request<object, object, LoginRequest>, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            sendErrorResponse(res, 400, "Email and password are required");
            return;
        }
        const user = await prisma.user.findFirst({
            where: {
                email,
                expiredDate: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            sendErrorResponse(res, 401, "Invalid credentials");
            return;
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            sendErrorResponse(res, 401, "Invalid credentials");
            return;
        }

        const token = generateToken<User>(user, String(process.env.JWT_SECRET), 10000);
        res.status(200).json({ message: "Login successful", token });
    } catch (_) {
        sendErrorResponse(res, 500, "Server error");
    }
};
