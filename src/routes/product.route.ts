import { Router } from 'express';
import { getProduct } from '../controllers';

const productRouter: Router = Router();

productRouter.use('/', getProduct)

export default productRouter;