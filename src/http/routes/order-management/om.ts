import { FastifyInstance } from 'fastify'
import { getOmByNumber } from '../../controllers/order-management/om'

export async function orderManagementRoutes(app: FastifyInstance) {
	app.get('/om/:id', getOmByNumber)
}
