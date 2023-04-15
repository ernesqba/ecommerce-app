import cors from 'cors'
import express, { Express, Request, Response } from 'express'

import logger from './common/logger/logger'
import { DataSource } from './config/data-source'
import { handle } from './middlewares/errors'
import loggerMiddleware from './middlewares/logger.middleware'
import routes from './routes'

const app: Express = express()

// JSON Decode
app.use(express.json())
app.use(cors())

// Custom middlewares
app.use(loggerMiddleware)

// Routes
app.use('/api/v1', routes)

app.use('/health', (_: Request, res: Response): Response => res.json({ uptime: process.uptime() }))

// Redirect to healt route
app.get('/', (_: Request, res: Response) => {
  res.redirect('/health')
})

app.use(handle)

const port = process.env.PORT

app.listen(port, () => {
  try {
    // MySql Connection
    DataSource.initialize()
    logger.info('Ready db connection!!')
    logger.info(`API Running at port: ${port}`)
  } catch (err) {
    logger.error(err.message)
  }
})
