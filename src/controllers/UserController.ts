import {Request, Response} from 'express';
import {UserService} from '../services/UserService';

export class UserController {
    static async show(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            const user = await UserService.show(
                req.params.id,
                req.user.id,
                req.user.role
            );
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(403).json({message: error.message});
        }
    }

    static async index(req: Request, res: Response) {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({message: 'Access denied'});
            }
            const users = await UserService.index();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    static async block(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({error: 'Unauthorized'});
            }

            const user = await UserService.block(req.params.id, req.user.id, req.user.role);

            res.json(user);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({error: message});
        }
    }
}
