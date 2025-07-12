import {User} from '../models/User';

export enum UserRole {
    user = 'user',
    admin = 'admin'
}

export class UserService {
    static async show(
        id: string,
        requesterId: string,
        requesterRole: UserRole
    ) {
        if (requesterRole !== UserRole.admin && requesterId !== id) {
            throw new Error('Access denied');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    static async index() {
        return await User.getAll();
    }


    static async block(
        id: string,
        requesterId: string,
        requesterRole: "user" | "admin"
    ) {
        if (requesterRole !== UserRole.admin && requesterId !== id) {
            throw new Error('Access denied');
        }

        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        await user.updateStatus('inactive');

        return user;
    }
}
