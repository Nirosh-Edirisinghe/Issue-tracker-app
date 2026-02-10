import express from 'express'
import authUser from '../middleware/authMiddleware.js'
import { createIssue, deleteIssue, getAllIssues, getSingleIssue, updateIssue, updateIssueStatus } from '../controllers/issueController.js'


const issueRouter = express.Router()

issueRouter.post('/create', authUser, createIssue)
issueRouter.get("/get-issues", authUser, getAllIssues);
issueRouter.put("/update-isseu/:id", authUser, updateIssue);
issueRouter.get("/get-issues/:id", authUser, getSingleIssue);
issueRouter.put("/update-status/:id", authUser, updateIssueStatus);
issueRouter.delete("/delete-issue/:id", authUser, deleteIssue);

export default issueRouter