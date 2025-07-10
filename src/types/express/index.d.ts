import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../../services/UserService'; // путь зависит от твоей структуры

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
