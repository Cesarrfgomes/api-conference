import { FastifyInstance } from 'fastify'
import { authenticate } from '../../controllers/user/authenticate'

export async function authenticateRoutes(app: FastifyInstance) {
	app.post('/auth', authenticate)
}
