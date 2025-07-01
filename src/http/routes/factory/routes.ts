import { FastifyInstance } from 'fastify'
import { createFactory } from '../../controllers/factory/create'
import { findFactories } from '../../controllers/factory/find'

export async function factoriesRoutes(app: FastifyInstance) {
	app.post('/factories', createFactory)
	app.get('/factories', findFactories)
}
