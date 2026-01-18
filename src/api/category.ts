import express from 'express'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../applications/category'
import { requireAdmin } from '../domain/middleware/autherization-middleware'
import { requireAuth } from '../domain/middleware/authentication-middleware'

const categoryRouter = express.Router()

categoryRouter.route('/').post(requireAuth, requireAdmin, createCategory)
categoryRouter.route('/').get(requireAuth, getAllCategories)
categoryRouter.route('/:id').get(requireAuth, getCategoryById)
categoryRouter.route('/:id').put(requireAuth, requireAdmin, updateCategory)
categoryRouter.route('/:id').delete(requireAuth, requireAdmin, deleteCategory)
export default categoryRouter