import express from 'express'
import { createSubmission } from '../applications/submission'
import { upload } from '../domain/errors/upload-error'

const submissionRouter = express.Router()

submissionRouter.route('/').post(upload.single('file'), createSubmission)
export default submissionRouter