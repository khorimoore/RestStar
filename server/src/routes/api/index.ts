import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { customerRouter } from './customer-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/customers', customerRouter);

export default router;
