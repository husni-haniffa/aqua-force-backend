import express from 'express'
import { getAllWaitlist, createWaitlist } from '../applications/waitlist'
import { requireAuth, requireAdmin } from '../domain/middleware'

const waitlistRouter = express.Router()

waitlistRouter.route('/').get(requireAuth, requireAdmin, getAllWaitlist)
waitlistRouter.route('/').post(requireAuth, createWaitlist)

export default waitlistRouter