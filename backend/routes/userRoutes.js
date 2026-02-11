import express from 'express'
import { getTeamMembers, getUserData, updateUserProfile } from '../controllers/userController.js'
import authUser from '../middleware/authMiddleware.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.get("/profile", authUser, getUserData)
userRouter.put("/update-profile", authUser, upload.single("image"), updateUserProfile);
userRouter.get("/team-members",getTeamMembers)
export default userRouter