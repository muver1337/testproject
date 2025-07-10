import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user/:id', authMiddleware, UserController.getUserById);
router.post('/user/:id/block', authMiddleware, UserController.blockUser);
router.get('/user', authMiddleware, UserController.getAllUsers);

export default router;