import { FastifyInstance } from 'fastify'
import { createFactory } from '../../controllers/factory/create'
import { findFactories } from '../../controllers/factory/find'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { getFactoryByName } from '../../controllers/factory/get'

export async function factoriesRoutes(app: FastifyInstance) {
	app.post(
		'/factories',
		{ onRequest: [verifyJWT, verifyUserRoutineAccess(9816)] },
		createFactory
	)
	app.get('/factories', findFactories)
	app.get(
		'/factories/:name',
		{ onRequest: [verifyJWT, verifyUserRoutineAccess(9816)] },
		getFactoryByName
	)
}
