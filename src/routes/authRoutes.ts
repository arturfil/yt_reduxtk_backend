import { Router } from 'express';
import { getCurrentUser, loginUser, signUp } from '../controllers/authController';

const router:Router = Router();

// "/getcurrentuser"
router.get("/currentuser", getCurrentUser);
router.post("/login", loginUser);
router.post("/signup", signUp);

export default router;