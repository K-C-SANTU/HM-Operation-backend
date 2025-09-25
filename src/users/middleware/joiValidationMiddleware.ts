import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { sendErrorResponse } from "@HM/utils/errorUtils";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
    }),
});

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        sendErrorResponse(res, 400, errorMessage);
        return;
    }
    next();
};
