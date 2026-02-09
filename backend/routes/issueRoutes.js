import express from 'express'
import authUser from '../middleware/authMiddleware.js'
import { createIssue, getAllIssues } from '../controllers/issueController.js'


const issueRouter = express.Router()

issueRouter.post('/create', authUser, createIssue)
issueRouter.get("/get-issues", authUser, getAllIssues);


export default issueRouter