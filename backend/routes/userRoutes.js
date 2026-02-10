import express from 'express'
import { getUserData, updateUserProfile } from '../controllers/userController.js'
import authUser from '../middleware/authMiddleware.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.get("/profile", authUser, getUserData)
userRouter.put("/update-profile", authUser, upload.single("image"), updateUserProfile);

export default userRouter