import {Request, Response} from 'express';
import {UserService} from '../services/UserService';

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const {name, firstName, lastName, birthDate, email, password, role} = req.body;
            const user = await UserService.register(name, firstName, lastName, birthDate, email, password, role);
            res.json(user);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({error: message});
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const {token} = await UserService.login(email, password);
            res.json({token});
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({error: message});
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user = await UserService.getUserById(
                req.params.id,
                req.user.id,
                req.user.role
            );
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(403).json({message: error.message});
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            if (!req.user || req.user.role !== 'ADMIN') {
                return res.status(403).json({message: 'Access denied'});
            }
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    static async blockUser(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({error: 'Unauthorized'});
            }

            const role = req.user.role.toUpperCase() as 'USER' | 'ADMIN'; // Приведение к нужному типу
            const user = await UserService.blockUser(req.params.id, req.user.id, req.user.role);

            res.json(user);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({error: message});
        }
    }
}
