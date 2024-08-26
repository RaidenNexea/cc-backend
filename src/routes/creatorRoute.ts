import { Router } from 'express';
// import { validateToken } from '@utils/jwtHelper';
import {
  getCreators,
  deleteCreator,
  getCreatorByID,
  updateCreator,
  updateMediaKit,
  getMediaKit,
  getCreatorFullInfoById,
  updatePaymentForm,
} from '../controller/creatorController';
import { isSuperAdmin } from 'src/middleware/onlySuperadmin';
import { needPermissions } from 'src/middleware/needPermissions';
import { isLoggedIn } from 'src/middleware/onlyLogin';
const router = Router();

router.get('/getAllCreators', isSuperAdmin, getCreators);
router.get('/getMediaKit', isSuperAdmin, getMediaKit);
router.get('/getCreatorByID/:id', isSuperAdmin, getCreatorByID);
router.get('/getCreatorFullInfoById/:id', isSuperAdmin, getCreatorFullInfoById);

router.patch('/update-creator', isLoggedIn, updateCreator);
router.patch('/update-media-kit', isLoggedIn, updateMediaKit);
router.patch('/updatePaymentForm', isLoggedIn, updatePaymentForm);

router.delete('/delete/:id', needPermissions(['delete:creator']), isSuperAdmin, deleteCreator);

export default router;
