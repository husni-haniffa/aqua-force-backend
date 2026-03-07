import express from 'express'
import { createResearchIdea, getAllResearchIdea } from '../applications/conduct-research'
import { requireAuth, requireAdmin} from '../domain/middleware'


const conductResearchRouter = express.Router()

conductResearchRouter.route('/research-idea').post(createResearchIdea)
conductResearchRouter.route('/research-idea').get(requireAuth, requireAdmin, getAllResearchIdea)

export default conductResearchRouter