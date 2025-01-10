import express from 'express';
import { followandunfollowUser, getFollowers, loginUser, logOutUser, myProfile, registerUser, userProfile } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", isAuth, myProfile)
router.get("/:id", isAuth, userProfile)
router.post("/follow/:id", isAuth, followandunfollowUser)
router.get("/logout/:id", isAuth, logOutUser)
router.get("/followings/:id" , isAuth , getFollowers)
export default router;