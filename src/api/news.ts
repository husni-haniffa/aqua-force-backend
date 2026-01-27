import express from 'express'
import { createNews, getNewsById, updateNews, getAllNews, deleteNews } from '../applications/news/'
import { requireAuth, requireAdmin } from '../domain/middleware'
import { imageUpload } from '../applications/news/helper'

const newsRouter = express.Router()

newsRouter.route('/').post(requireAuth, requireAdmin, imageUpload.single('file'), createNews)
newsRouter.route('/').get(getAllNews)
newsRouter.route('/:id').get(getNewsById)
newsRouter.route('/:id').put(requireAuth, requireAdmin, imageUpload.single('file'), updateNews)
newsRouter.route('/:id').delete(requireAuth, requireAdmin, deleteNews)

export default newsRouter