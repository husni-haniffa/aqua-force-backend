
import express from 'express'
import { requireAuth, requireAdmin } from '../domain/middleware'
import { deleteSubmission, getAllSubmissions, statusApproved, statusReject, statusUnderReview, publishSubmission, addSocialMediaLinks, updateSocialMediaLinks } from '../applications/submissions/admin'

const submissionRouter = express.Router()

submissionRouter.route('/').get(requireAuth, requireAdmin, getAllSubmissions)
submissionRouter.route('/delete/:id').delete(requireAuth, requireAdmin, deleteSubmission)
submissionRouter.route('/review/:id').put(requireAuth, requireAdmin, statusUnderReview)
submissionRouter.route('/accept/:id').put(requireAuth, requireAdmin, statusApproved)
submissionRouter.route('/reject/:id').put(requireAuth, requireAdmin, statusReject)
submissionRouter.route('/publish/:id').put(requireAuth, requireAdmin, publishSubmission)
submissionRouter.route('/add-social-media-links/:id').post(requireAuth, requireAdmin, addSocialMediaLinks)
submissionRouter.route('/update-social-media-links/:id').put(requireAuth, requireAdmin, updateSocialMediaLinks)

export default submissionRouter