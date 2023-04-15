import { Router } from 'express'

import authMiddleware from '../../../middlewares/auth.middleware'
import roleMiddleware from '../../../middlewares/role.middleware'
import { UserController } from '../controllers/user.controller'
import { RoleEnum } from '../dtos/user.dto'

const router = Router()
router.get('/', authMiddleware, roleMiddleware(RoleEnum.ADMIN), UserController.getUsers)

export = router
