import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users/:id', authMiddleware, UserController.getById);
router.patch('/users/:id/block', authMiddleware, UserController.block);
router.get('/users', authMiddleware, UserController.getAll);

export default router;