import { FastifyInstance } from 'fastify'
import { getOmByNumber } from '../controllers/om'

export async function orderManagementRoutes(app: FastifyInstance) {
	app.get('/om/:id', getOmByNumber)
}
