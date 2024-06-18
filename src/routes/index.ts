import type { Request, Response } from 'express';
import { Router } from 'express';
import { BaseResponse } from '../models';
import userRouter from './user.route';
import productRouter from './product.route';

const router = Router();

router.use('/user', userRouter)
router.use('/product', productRouter)

router.use('/', (req: Request, res: Response<BaseResponse>) => {
  res.status(404).json({ 
    message: 'Not Found',
    success: false, 
    data: null
  });
});

export default router;