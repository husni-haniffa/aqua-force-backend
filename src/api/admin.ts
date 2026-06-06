import express from 'express'
import { requireAdmin, requireAuth, requireSuperAdmin } from '../domain/middleware'
import { updateRoleToAdmin, getUserList, removeAdminRole } from '../applications/users'
import { getAdminDashboardStats } from '../applications/dashboard/overview'

const adminRouter = express.Router()

adminRouter.route('/users').get(requireAuth, requireAdmin, getUserList)
adminRouter.route('/user/admin/:id').put(requireAuth, requireAdmin, requireSuperAdmin, updateRoleToAdmin)
adminRouter.route('/user/admin/remove/:id').put(requireAuth, requireAdmin, requireSuperAdmin, removeAdminRole)
adminRouter.route('/dashboard/overview').get(requireAuth, requireAdmin, getAdminDashboardStats)

export default adminRouter