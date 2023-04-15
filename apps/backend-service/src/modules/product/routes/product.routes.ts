import { Router } from 'express'

import authMiddleware from '../../../middlewares/auth.middleware'
import roleMiddleware from '../../../middlewares/role.middleware'
import { RoleEnum } from '../../user/dtos/user.dto'
import { ProductController } from '../controllers/product.controller'

const router = Router()
router.post('/', authMiddleware, roleMiddleware(RoleEnum.ADMIN), ProductController.createProduct)
router.post('/purchased', authMiddleware, ProductController.purchasedProducts)
router.get('/', authMiddleware, ProductController.getProducts)
router.patch('/:id', authMiddleware, roleMiddleware(RoleEnum.ADMIN), ProductController.updateProduct)
router.delete('/:id', authMiddleware, roleMiddleware(RoleEnum.ADMIN), ProductController.deleteProduct)

export = router
