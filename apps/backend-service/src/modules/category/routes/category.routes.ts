import { Router } from 'express'

import authMiddleware from '../../../middlewares/auth.middleware'
import roleMiddleware from '../../../middlewares/role.middleware'
import { RoleEnum } from '../../user/dtos/user.dto'
import { CategoryController } from '../controllers/category.controller'

const router = Router()
router.post('/', authMiddleware, roleMiddleware(RoleEnum.ADMIN), CategoryController.createCategory)
router.get('/', authMiddleware, CategoryController.getCategories)
router.patch('/:id', authMiddleware, roleMiddleware(RoleEnum.ADMIN), CategoryController.updateCategory)
router.delete('/:id', authMiddleware, roleMiddleware(RoleEnum.ADMIN), CategoryController.deleteCategory)

export = router
