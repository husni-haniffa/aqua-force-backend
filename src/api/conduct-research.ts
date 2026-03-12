import express from 'express'
import { createResearchIdea, createResearchFunding, createResearchHelp, 
    createResearchPlacement, createResearchStudent, createResearchSupervisor,
     getAllResearchFunding, getAllResearchHelp, getAllResearchIdea, 
    getAllResearchPlacement, getAllResearchStudent, getAllResearchSupervisor,
    deleteResearchIdea,
    deleteResearchFunding,
    deleteResearchSupervisor,
    deleteResearchPlacement,
    deleteResearchStudent,
    deleteResearchHelp
    
} from '../applications/conduct-research'
import { requireAuth, requireAdmin} from '../domain/middleware'


const conductResearchRouter = express.Router()

conductResearchRouter.route('/research-idea').post(createResearchIdea)
conductResearchRouter.route('/research-idea').get(requireAuth, requireAdmin, getAllResearchIdea)
conductResearchRouter.route('/research-idea/:id').delete(requireAuth, requireAdmin, deleteResearchIdea)


conductResearchRouter.route('/research-placement').post(createResearchPlacement)
conductResearchRouter.route('/research-placement').get(requireAuth, requireAdmin, getAllResearchPlacement)
conductResearchRouter.route('/research-placement/:id').delete(requireAuth, requireAdmin, deleteResearchPlacement)


conductResearchRouter.route('/research-supervisor').post(createResearchSupervisor)
conductResearchRouter.route('/research-supervisor').get(requireAuth, requireAdmin, getAllResearchSupervisor)
conductResearchRouter.route('/research-supervisor/:id').delete(requireAuth, requireAdmin, deleteResearchSupervisor)


conductResearchRouter.route('/research-student').post(createResearchStudent)
conductResearchRouter.route('/research-student').get(requireAuth, requireAdmin, getAllResearchStudent)
conductResearchRouter.route('/research-student/:id').delete(requireAuth, requireAdmin, deleteResearchStudent)


conductResearchRouter.route('/research-funding').post(createResearchFunding)
conductResearchRouter.route('/research-funding').get(requireAuth, requireAdmin, getAllResearchFunding)
conductResearchRouter.route('/research-funding/:id').delete(requireAuth, requireAdmin, deleteResearchFunding)


conductResearchRouter.route('/research-help').post(createResearchHelp)
conductResearchRouter.route('/research-help').get(requireAuth, requireAdmin, getAllResearchHelp)
conductResearchRouter.route('/research-help/:id').delete(requireAuth, requireAdmin, deleteResearchHelp)



export default conductResearchRouter