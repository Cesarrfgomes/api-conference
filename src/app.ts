import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { orderManagementRoutes } from './http/routes/order-management/om'
import { authenticateRoutes } from './http/routes/user/authenticate'
import { factoriesRoutes } from './http/routes/factory/routes'
import { calcProductPriceRoutes } from './http/routes/calc/routes'
import { fastifyCors } from '@fastify/cors'
import { ZodError } from 'zod'
import { userRoutes } from './http/routes/user/get-user'

export const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: '3h'
	}
})

app.register(authenticateRoutes)
app.register(userRoutes)
app.register(orderManagementRoutes)
app.register(factoriesRoutes)
app.register(calcProductPriceRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error:',
			issues: error.format()
		})
	}

	if (env.NODE_ENV !== 'prod') {
		console.error(env.NODE_ENV, error)

		return reply.send(error)
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})

app.listen({
	host: '0.0.0.0',
	port: env.PORT
}).then(() => {
	console.log(`HTTP Server Started ${env.PORT}`)
})
