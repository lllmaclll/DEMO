import { Router } from 'express';
import { createPost, deletePost, getPost, getPostById, updatePost } from '../controllers';

const postRouter: Router = Router();

postRouter.get('/', getPost)
postRouter.get('/:postId', getPostById)
postRouter.post('/', createPost)
postRouter.put('/:postId', updatePost)
postRouter.delete('/:postId', deletePost)

export default postRouter;