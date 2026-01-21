import express from 'express'
import { requireAuth } from '../domain/middleware'
import { submissionUpload } from '../applications/submissions/helper'
import { createSubmission, getSubmissionByUserId, updateSubmission } from '../applications/submissions/user'

const userRouter = express.Router()

userRouter.route('/submissions',).post(requireAuth, submissionUpload.single('file'), createSubmission)
userRouter.route('/submissions/:id',).get(requireAuth, getSubmissionByUserId)
userRouter.route('/submissions/:id',).put(requireAuth, submissionUpload.single('file'), updateSubmission)

export default userRouter