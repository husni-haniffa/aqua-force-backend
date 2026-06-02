import express from 'express'
import { requireAdmin, requireAuth } from '../domain/middleware'
import { updateRoleToAdmin, getUserList, removeAdminRole } from '../applications/users'
import { getAdminDashboardStats } from '../applications/dashboard/overview'

const adminRouter = express.Router()

adminRouter.route('/users').get(requireAuth, requireAdmin, getUserList)
adminRouter.route('/user/admin/:id').put(requireAuth, requireAdmin, updateRoleToAdmin)
adminRouter.route('/user/admin/remove/:id').put(requireAuth, requireAdmin, removeAdminRole)
adminRouter.route('/dashboard/overview').get(requireAuth, requireAdmin, getAdminDashboardStats)

export default adminRouter