import express from 'express'

import authRoutes from '../modules/auth/routes/auth.routes'
import categoryRoutes from '../modules/category/routes/category.routes'
import productRoutes from '../modules/product/routes/product.routes'
import userRoutes from '../modules/user/routes/user.routes'

const router = express.Router()

// Routes
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)

export default router
