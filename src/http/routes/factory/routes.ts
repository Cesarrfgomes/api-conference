import { FastifyInstance } from 'fastify'
import { createFactory } from '../../controllers/factory/create'

export async function factoriesRoutes(app: FastifyInstance) {
	app.post('/factories', createFactory)
}
