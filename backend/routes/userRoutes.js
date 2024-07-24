import express from "express"

//controllers

import {
    createUser, loginUser, logoutCurrentUser, getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile
} from "../controllers/userController.js";

//middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router()

// regular users can't see all the users. The user should be authenticated and
// also authorized as an admin then they'll be able to see
// all the users
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

//login user
router.post("/auth", loginUser)
//logout user
router.post("/logout", logoutCurrentUser);

// getting a specific user profile
// user should be just authenticated then we'll be able to get current user profile
router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

export default router;