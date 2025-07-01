import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { orderManagementRoutes } from './http/routes/order-management/om'
import { usersRoutes } from './http/routes/user/authenticate'
import { factoriesRoutes } from './http/routes/factory/routes'
import { calcProductPriceRoutes } from './http/routes/calc/routes'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: '10m'
	}
})

app.register(orderManagementRoutes)
app.register(usersRoutes)
app.register(factoriesRoutes)
app.register(calcProductPriceRoutes)

app.listen({
	port: env.PORT
}).then(() => {
	console.log(`HTTP Server Started ${env.PORT}`)
})
