import { FastifyInstance } from 'fastify'
import { getOms } from '../controllers/om'

export async function orderManagementRoutes(app: FastifyInstance) {
	app.get('/om/:id', getOms)
}
