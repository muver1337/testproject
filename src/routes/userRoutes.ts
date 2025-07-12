import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @openapi
 * ${registerRoute}
 */
router.post('/register', AuthController.register);

/**
 * @openapi
 * ${loginRoute}
 */
router.post('/login', AuthController.login);

/**
 * @openapi
 * ${blockUserByIdRoute}
 */
router.patch('/users/:id/block', authMiddleware, UserController.block);

/**
 * @openapi
 * ${getUserByIdRoute}
 */

router.get('/users/:id', authMiddleware, UserController.show);
/**
 * @openapi
 * ${getUsersRoute}
 */
router.get('/users', authMiddleware, UserController.index);

export default router;
