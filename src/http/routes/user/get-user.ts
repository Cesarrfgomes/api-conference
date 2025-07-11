import { FastifyInstance } from 'fastify'
import { getUserByNameTag } from '../../controllers/user/get-user-by-name-tag'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/usuarios', getUserByNameTag)
}
