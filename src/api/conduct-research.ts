import express from 'express'
import { createResearchIdea, createResearchFunding, createResearchHelp, 
    createResearchPlacement, createResearchStudent, createResearchSupervisor,
     getAllResearchFunding, getAllResearchHelp, getAllResearchIdea, 
    getAllResearchPlacement, getAllResearchStudent, getAllResearchSupervisor
} from '../applications/conduct-research'
import { requireAuth, requireAdmin} from '../domain/middleware'


const conductResearchRouter = express.Router()

conductResearchRouter.route('/research-idea').post(createResearchIdea)
conductResearchRouter.route('/research-idea').get(requireAuth, requireAdmin, getAllResearchIdea)

conductResearchRouter.route('/research-placement').post(createResearchPlacement)
conductResearchRouter.route('/research-placement').get(requireAuth, requireAdmin, getAllResearchPlacement)

conductResearchRouter.route('/research-supervisor').post(createResearchSupervisor)
conductResearchRouter.route('/research-supervisor').get(requireAuth, requireAdmin, getAllResearchSupervisor)

conductResearchRouter.route('/research-student').post(createResearchStudent)
conductResearchRouter.route('/research-student').get(requireAuth, requireAdmin, getAllResearchStudent)

conductResearchRouter.route('/research-funding').post(createResearchFunding)
conductResearchRouter.route('/research-funding').get(requireAuth, requireAdmin, getAllResearchFunding)

conductResearchRouter.route('/research-help').post(createResearchHelp)
conductResearchRouter.route('/research-help').get(requireAuth, requireAdmin, getAllResearchHelp)


export default conductResearchRouter