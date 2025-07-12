import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {AuthController} from '../controllers/AuthController';
import {authMiddleware} from '../middlewares/authMiddleware';
import {registerSchema, loginSchema} from '../validation/authValidation'

const router = Router();

/**
 * @openapi
 * ${registerRoute}
 */
router.post('/register', async (req, res) => {
    try {
        await registerSchema.validateAsync(req.body);
        return AuthController.register(req, res);
    } catch (error: any) {
        return res.status(400).json({ error: error.details[0].message });
    }
});

/**
 * @openapi
 * ${loginRoute}
 */
router.post('/login', async (req, res) => {
    try {
        await loginSchema.validateAsync(req.body);
        return AuthController.login(req, res);
    } catch (error: any) {
        return res.status(400).json({error: error.details[0].message});
    }
});

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
