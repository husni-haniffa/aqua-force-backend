import express from 'express'
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../applications/event'
import { requireAdmin } from '../domain/middleware/autherization-middleware'
import { requireAuth } from '../domain/middleware/authentication-middleware'

const eventRouter = express.Router()

eventRouter.route('/').post(requireAuth, requireAdmin, createEvent)
eventRouter.route('/').get(getAllEvents)
eventRouter.route('/:id').get(getEventById)
eventRouter.route('/:id').put(requireAuth, requireAdmin, updateEvent)
eventRouter.route('/:id').delete(requireAuth, requireAdmin, deleteEvent)
export default eventRouter