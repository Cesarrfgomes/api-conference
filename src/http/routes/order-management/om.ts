import { FastifyInstance } from 'fastify'
import { getOmByNumber } from '../../controllers/order-management/om'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function orderManagementRoutes(app: FastifyInstance) {
	app.get('/om/:id', { onRequest: [verifyJWT] }, getOmByNumber)
}
