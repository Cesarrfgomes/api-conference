import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from './env'
import { orderManagementRoutes } from './http/routes/order-management/om'
import { authenticateRoutes } from './http/routes/user/authenticate'
import { factoriesRoutes } from './http/routes/factory/routes'
import { calcProductPriceRoutes } from './http/routes/calc/routes'
import { fastifyCors } from '@fastify/cors'
import { ZodError } from 'zod'
import { userRoutes } from './http/routes/user/get-user'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'
import { NotFoundUserError } from './use-cases/errors/user-not-found-error'
import { FactoryAlreadyExistsError } from './use-cases/errors/factory-already-exists-error'
import { NotFoundFactoryError } from './use-cases/errors/factory-not-found-error'
import { MaximumUsersInAPartitionError } from './use-cases/errors/maximum-users-in-partition-reached-error'
import { UserUnauthorizedDepositAccessError } from './use-cases/errors/user-unauthorized-to-access-deposit-error'
import { NotFoundOrderManagementError } from './use-cases/errors/order-management-not-found-error'
import { NotFoundCalcProductPriceError } from './use-cases/errors/calc-not-found-error'
import { NotFoundUserDepositsError } from './use-cases/errors/user-deposits-not-found-error'
import { UserUnauthorizedRoutineAccessError } from './use-cases/errors/user-unauthorized-routine-access-error'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyCors, {
	origin: '*',
	credentials: true
})

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false
	},
	sign: {
		expiresIn: '1m'
	}
})

app.register(fastifyCookie)

app.register(fastifySwagger, {
	swagger: {
		info: {
			title: 'API Conference - Papa Materiais',
			description:
				'API para gerenciamento de conferência e cálculos de preços',
			version: '1.0.0'
		},
		host: 'localhost:3333',
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
		securityDefinitions: {
			Bearer: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
				description: 'JWT token no formato: Bearer <token>'
			}
		},
		security: [
			{
				Bearer: []
			}
		],
		tags: [
			{
				name: 'Autenticação',
				description: 'Endpoint de autenticação'
			},
			{
				name: 'Usuários',
				description: 'Endpoints de usuários'
			},
			{
				name: 'Fábricas',
				description: 'Endpoints de fábricas para cálculo de preço'
			},
			{
				name: 'Cálculos',
				description: 'Endpoints de cálculo de preços'
			},
			{
				name: 'Gerenciamento de OMs',
				description: 'Endpoints de gerenciamento de OMs'
			}
		]
	}
})

app.register(fastifySwaggerUi, {
	routePrefix: '/documentation',
	uiConfig: {
		docExpansion: 'list',
		deepLinking: false
	},
	uiHooks: {
		onRequest: function (request, reply, next) {
			next()
		},
		preHandler: function (request, reply, next) {
			next()
		}
	},
	staticCSP: true,
	transformStaticCSP: header => header
})

app.register(authenticateRoutes)
app.register(userRoutes)
app.register(orderManagementRoutes)
app.register(factoriesRoutes)
app.register(calcProductPriceRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.format()
		})
	}

	if (error instanceof InvalidCredentialsError) {
		return reply.status(401).send({
			message: error.message
		})
	}

	if (error instanceof NotFoundUserError) {
		return reply.status(404).send({
			message: error.message
		})
	}

	if (error instanceof FactoryAlreadyExistsError) {
		return reply.status(409).send({
			message: error.message
		})
	}

	if (error instanceof NotFoundFactoryError) {
		return reply.status(404).send({
			message: error.message
		})
	}

	if (error instanceof MaximumUsersInAPartitionError) {
		return reply.status(400).send({
			message: error.message
		})
	}

	if (error instanceof UserUnauthorizedDepositAccessError) {
		return reply.status(403).send({
			message: error.message
		})
	}

	if (error instanceof UserUnauthorizedRoutineAccessError) {
		return reply.status(403).send({
			message: error.message
		})
	}

	if (error instanceof NotFoundOrderManagementError) {
		return reply.status(404).send({
			message: error.message
		})
	}

	if (error instanceof NotFoundCalcProductPriceError) {
		return reply.status(404).send({
			message: error.message
		})
	}

	if (error instanceof NotFoundUserDepositsError) {
		return reply.status(404).send({
			message: error.message
		})
	}

	if (env.NODE_ENV !== 'prod') {
		console.error(env.NODE_ENV, error)

		return reply.send(error)
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
		console.error('Internal server error:', error)
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})

app.listen({
	host: '0.0.0.0',
	port: env.PORT
}).then(() => {
	console.log(`HTTP Server Started ${env.PORT}`)
	console.log(
		`Swagger documentation available at http://localhost:${env.PORT}/documentation`
	)
})
