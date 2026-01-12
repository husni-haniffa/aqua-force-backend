import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../applications/category'

const categoryRouter = express.Router()

categoryRouter.route('/').post(createCategory)
categoryRouter.route('/').get(getAllCategories)
categoryRouter.route('/:id').get(getCategoryById)
categoryRouter.route('/:id').put(updateCategory)
categoryRouter.route('/:id').delete(deleteCategory)
export default categoryRouter