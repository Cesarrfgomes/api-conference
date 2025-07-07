import { FastifyInstance } from 'fastify'
import { getUserByNameTag } from '../../controllers/user/get-user-by-name-tag'

export async function userRoutes(app: FastifyInstance) {
	app.get('/usuarios', getUserByNameTag)
}
