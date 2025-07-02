import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { orderManagementRoutes } from './http/routes/order-management/om'
import { usersRoutes } from './http/routes/user/authenticate'
import { factoriesRoutes } from './http/routes/factory/routes'
import { calcProductPriceRoutes } from './http/routes/calc/routes'
import { fastifyCors } from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: '3h'
	}
})

app.register(orderManagementRoutes)
app.register(usersRoutes)
app.register(factoriesRoutes)
app.register(calcProductPriceRoutes)

app.listen({
	host: '0.0.0.0',
	port: env.PORT
}).then(() => {
	console.log(`HTTP Server Started ${env.PORT}`)
})
