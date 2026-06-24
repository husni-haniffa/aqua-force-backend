import express from 'express'
import { createResearchType, getAllResearchTypes, getResearchTypeById, updateResearchType, deleteResearchType } from '../applications/research-types'
import { requireAuth, requireAdmin} from '../domain/middleware'

const researchTypeRouter = express.Router()

researchTypeRouter.route('/').post(requireAuth, requireAdmin, createResearchType)
researchTypeRouter.route('/').get(getAllResearchTypes)
researchTypeRouter.route('/:id').get(getResearchTypeById)
researchTypeRouter.route('/:id').put(requireAuth, requireAdmin, updateResearchType)
researchTypeRouter.route('/:id').delete(requireAuth, requireAdmin, deleteResearchType)

export default researchTypeRouter