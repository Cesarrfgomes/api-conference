import { FastifyInstance } from 'fastify'
import { calcProductPrice } from '../../controllers/calc/create'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'
import { findUserCalcs } from '../../controllers/calc/find-user-calcs'
import { getUserCalcById } from '../../controllers/calc/get-user-calc'

export async function calcProductPriceRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)
	app.addHook('onRequest', verifyUserRoutineAccess(9816))

	app.post('/calculos', calcProductPrice)

	app.get('/calculos', findUserCalcs)

	app.get('/calculos/:id', getUserCalcById)
}
