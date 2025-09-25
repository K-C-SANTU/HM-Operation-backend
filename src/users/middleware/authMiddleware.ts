import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "@HM/users/utils/authUtils";
import { sendErrorResponse } from "@HM/utils/errorUtils";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        sendErrorResponse(res, 401, "No token provided");
        return;
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (_) {
        sendErrorResponse(res, 401, "Invalid token");
    }
};
