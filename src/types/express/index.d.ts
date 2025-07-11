import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../../services/UserService';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {
                id: string;
                role: UserRole;
            };
        }
    }
}

export {};
