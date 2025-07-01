import { FastifyInstance } from 'fastify'
import { calcProductPrice } from '../../controllers/calc/create'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'

export async function calcProductPriceRoutes(app: FastifyInstance) {
	app.post(
		'/calc',
		{ onRequest: [verifyJWT, verifyUserRoutineAccess(9816)] },
		calcProductPrice
	)
}
