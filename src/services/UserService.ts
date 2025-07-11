import {User} from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
const JWT_SECRET_TYPED = JWT_SECRET as string;

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class UserService {
    static async register(
        name: string,
        firstName: string,
        lastName: string,
        birthDate: string,
        email: string,
        password: string,
        role: UserRole
    ) {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await User.create({
            name,
            firstName,
            lastName,
            birthDate: new Date(birthDate),
            email,
            password: hashedPassword,
            role,
        });
    }

    static async login(email: string, password: string) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET_TYPED,
            { expiresIn: '1h' }
        );

        return { token };
    }

    static async getById(
        id: string,
        requesterId: string,
        requesterRole: UserRole
    ) {
        if (requesterRole !== UserRole.ADMIN && requesterId !== id) {
            throw new Error('Access denied');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    static async getAll() {
        return await User.getAll();
    }


    static async block(
        id: string,
        requesterId: string,
        requesterRole: "USER" | "ADMIN"
    ) {
        if (requesterRole !== UserRole.ADMIN && requesterId !== id) {
            throw new Error('Access denied');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        await user.updateStatus('INACTIVE');

        return user;
    }
}
