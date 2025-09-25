import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (candidate: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(candidate, hashed);
};

// Sign a JWT with a generic payload type
export function generateToken<T extends object>(payload: T, jwtSecret: string, expiresIn: number): string {
    return jwt.sign(payload, jwtSecret, { expiresIn });
}

// Verify a JWT and return the decoded payload as the expected type
export function verifyToken<T extends object>(token: string, jwtSecret: string): T {
    return jwt.verify(token, jwtSecret) as T;
}
