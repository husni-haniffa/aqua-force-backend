import express from 'express'
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from '../applications/news'

const newsRouter = express.Router()

newsRouter.route('/').post(createNews)
newsRouter.route('/').get(getAllNews)
newsRouter.route('/:id').get(getNewsById)
newsRouter.route('/:id').put(updateNews)
newsRouter.route('/:id').delete(deleteNews)
export default newsRouter