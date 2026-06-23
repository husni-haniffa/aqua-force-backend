import express from 'express'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../applications/categories'
import { requireAuth, requireAdmin, requireSuperAdmin } from '../domain/middleware'

const categoryRouter = express.Router()

categoryRouter.route('/').post(requireAuth, requireAdmin, createCategory)
categoryRouter.route('/').get(getAllCategories)
categoryRouter.route('/:id').get(getCategoryById)
categoryRouter.route('/:id').put(requireAuth, requireAdmin, updateCategory)
categoryRouter.route('/:id').delete(requireAuth, requireAdmin, requireSuperAdmin, deleteCategory)

export default categoryRouter