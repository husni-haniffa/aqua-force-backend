import express from 'express'
import { getPublishedPaperById, getPublishedPapers } from '../applications/publications'

const publicationRouter = express.Router()

publicationRouter.route('/').get(getPublishedPapers)
publicationRouter.route('/:id').get(getPublishedPaperById)

export default publicationRouter