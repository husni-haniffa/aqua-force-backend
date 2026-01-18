import express from 'express'
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from '../applications/news'
import { requireAdmin } from '../domain/middleware/autherization-middleware'
import { requireAuth } from '../domain/middleware/authentication-middleware'

const newsRouter = express.Router()

newsRouter.route('/').post(requireAuth, requireAdmin,  createNews)
newsRouter.route('/').get(getAllNews)
newsRouter.route('/:id').get(getNewsById)
newsRouter.route('/:id').put(requireAuth, requireAdmin, updateNews)
newsRouter.route('/:id').delete(requireAuth, requireAdmin, deleteNews)
export default newsRouter