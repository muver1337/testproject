import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../services/UserService'; // обязательно импортируй UserRole

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
const JWT_SECRET_TYPED = JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET_TYPED) as JwtPayload;

        // Явно приводим role к enum UserRole
        const role = decoded.role as UserRole;

        req.user = {
            ...decoded,
            id: decoded.id as string,
            role
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
