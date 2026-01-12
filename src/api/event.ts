import express from 'express'
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../applications/event'

const eventRouter = express.Router()

eventRouter.route('/').post(createEvent)
eventRouter.route('/').get(getAllEvents)
eventRouter.route('/:id').get(getEventById)
eventRouter.route('/:id').put(updateEvent)
eventRouter.route('/:id').delete(deleteEvent)
export default eventRouter