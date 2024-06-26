import { Router } from 'express';
import { createProfile, deleteProfile, getProfile, getProfileById, updateProfile } from '../controllers';

const profileRouter: Router = Router();

profileRouter.get('/', getProfile)
profileRouter.get('/:profileId', getProfileById)
profileRouter.post('/', createProfile)
profileRouter.put('/:profileId', updateProfile)
profileRouter.delete('/:profileId', deleteProfile)

export default profileRouter;