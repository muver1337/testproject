import {Request, Response} from 'express';
import {AuthService} from '../services/AuthService';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const {name, firstName, lastName, birthDate, email, password, role} = req.body;
            const user = await AuthService.register(name, firstName, lastName, birthDate, email, password, role);
            res.json(user);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({error: message});
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const {token} = await AuthService.login(email, password);
            res.json({token});
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({error: message});
        }
    }
}
