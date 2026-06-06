
import express from 'express'
import { requireAuth, requireAdmin, requireSuperAdmin} from '../domain/middleware'
import { deleteSubmission, getAllSubmissions, statusApproved, statusReject, statusUnderReview, publishSubmission, addSocialMediaLinks, updateSocialMediaLinks } from '../applications/submissions/admin'

const submissionRouter = express.Router()

submissionRouter.route('/').get(requireAuth, requireAdmin, getAllSubmissions)
submissionRouter.route('/delete/:id').delete(requireAuth, requireAdmin, requireSuperAdmin, deleteSubmission)
submissionRouter.route('/review/:id').put(requireAuth, requireAdmin, requireSuperAdmin, statusUnderReview)
submissionRouter.route('/accept/:id').put(requireAuth, requireAdmin, requireSuperAdmin, statusApproved)
submissionRouter.route('/reject/:id').put(requireAuth, requireAdmin, requireSuperAdmin, statusReject)
submissionRouter.route('/publish/:id').put(requireAuth, requireAdmin, requireSuperAdmin, publishSubmission)
submissionRouter.route('/add-social-media-links/:id').post(requireAuth, requireAdmin, addSocialMediaLinks)
submissionRouter.route('/update-social-media-links/:id').put(requireAuth, requireAdmin, updateSocialMediaLinks)

export default submissionRouter