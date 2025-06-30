import fastify from 'fastify'
import { env } from './env'
import { orderManagementRoutes } from './http/routes/om'

export const app = fastify()

app.register(orderManagementRoutes)

app.listen({
	port: env.PORT
}).then(() => {
	console.log(`HTTP Server Started ${env.PORT}`)
})
