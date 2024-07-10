import type { Request, Response } from 'express';
import { Router } from 'express';
import { BaseResponse } from '../models';
import userRouter from './user.route';
import productRouter from './profile.route';
import postRouter from './post.route';
import authRouter from './auth.route';
import { verifyToken } from '../middlewares';

const router = Router();

router.use('/user3', verifyToken, userRouter)
router.use('/product', productRouter)
router.use('/post', postRouter)
router.use('/auth', authRouter)

router.use('/', (req: Request, res: Response<BaseResponse>) => {
  res.status(404).json({ 
    message: 'Not Found',
    success: false, 
    data: null
  });
});

export default router;