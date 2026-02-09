import express from 'express'
import authUser from '../middleware/authMiddleware.js'
import { createIssue } from '../controllers/issueController.js'


const issueRouter = express.Router()

issueRouter.post('/create', authUser, createIssue)


export default issueRouter