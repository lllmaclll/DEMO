import { Router } from 'express';
import { createUser, deleteUser, getUser, getUserById, updateUser } from '../controllers';
import { cachedData } from '../middlewares';

const userRouter: Router = Router();

userRouter.get('/', cachedData, getUser)
userRouter.get('/:userId', getUserById)
userRouter.post('/', createUser)
userRouter.put('/:userId', updateUser)
userRouter.delete('/:userId', deleteUser)

export default userRouter;