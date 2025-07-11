import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @openapi
 * ${registerRoute}
 */
router.post('/register', UserController.register);

/**
 * @openapi
 * ${loginRoute}
 */
router.post('/login', UserController.login);

/**
 * @openapi
 * ${blockUserByIdRoute}
 */
router.patch('/users/:id/block', authMiddleware, UserController.block);

/**
 * @openapi
 * ${getUserByIdRoute}
 */

router.get('/users/:id', authMiddleware, UserController.getById);
/**
 * @openapi
 * ${getUsersRoute}
 */
router.get('/users', authMiddleware, UserController.getAll);

export default router;
