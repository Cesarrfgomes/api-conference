import { FastifyInstance } from 'fastify'
import { authenticate } from '../../controllers/user/authenticate'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/auth', authenticate)
}
