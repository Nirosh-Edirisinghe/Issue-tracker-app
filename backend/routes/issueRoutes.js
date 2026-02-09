import express from 'express'
import authUser from '../middleware/authMiddleware.js'
import { createIssue, getAllIssues, getSingleIssue, updateIssue } from '../controllers/issueController.js'


const issueRouter = express.Router()

issueRouter.post('/create', authUser, createIssue)
issueRouter.get("/get-issues", authUser, getAllIssues);
issueRouter.put("/update-isseu/:id", authUser, updateIssue);
issueRouter.get("/get-issues/:id", authUser, getSingleIssue);


export default issueRouter