import fastify from 'fastify'
import { env } from './env'
import { orderManagementRoutes } from './http/routes/order-management/om'
import { usersRoutes } from './http/routes/user/authenticate'

export const app = fastify()

app.register(orderManagementRoutes)
app.register(usersRoutes)

app.listen({
	port: env.PORT
}).then(() => {
	console.log(`HTTP Server Started ${env.PORT}`)
})
