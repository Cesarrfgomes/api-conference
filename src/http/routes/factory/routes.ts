import { FastifyInstance } from 'fastify'
import { createFactory } from '../../controllers/factory/create'
import { findFactories } from '../../controllers/factory/find'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function factoriesRoutes(app: FastifyInstance) {
	app.post(
		'/factories',
		{ onRequest: [verifyJWT, verifyUserRoutineAccess(9816)] },
		createFactory
	)
	app.get('/factories', findFactories)
}
