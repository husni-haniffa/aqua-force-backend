import express from 'express'
import { requireAuth } from '../domain/middleware'
import { submissionUpload } from '../applications/submissions/helper'
import { createSubmission, getSubmissionById, getSubmissionByUserId, updateSubmission } from '../applications/submissions/user'
import { researchSubmissionRateLimiter } from '../infrastructure/utils/rateLimiter'

const userRouter = express.Router()

userRouter.route('/submissions',).post(researchSubmissionRateLimiter, requireAuth ,submissionUpload.single('file'), createSubmission)
userRouter.route('/submissions/:id',).get(requireAuth, getSubmissionByUserId)
userRouter.route('/submission/:id',).get(requireAuth, getSubmissionById)
userRouter.route('/submissions/:id',).put(researchSubmissionRateLimiter, requireAuth, submissionUpload.single('file'), updateSubmission)

export default userRouter