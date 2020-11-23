import express from 'express';
import auth from '../middleware/auth.js';

import { login, getUserData } from '../controllers/auth.js';

const router = express.Router();

router.post('/', login);
router.get('/user', auth, getUserData);

export default router;
