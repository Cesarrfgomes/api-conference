import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateUserBodySchema = z.object({
		username: z.string(),
		password: z.string()
	})

	const { username, password } = authenticateUserBodySchema.parse(
		request.body
	)

	try {
		const authenticate = makeAuthenticateUseCase()

		const { winthorUser, kaizenUser } = await authenticate.execute({
			username,
			password
		})
		console.log(winthorUser)

		const token = await reply.jwtSign({
			sign: {
				sub: winthorUser.winthorUserId,
				kaizenId: kaizenUser?.kaizenUserId
			}
		})

		const refreshToken = await reply.jwtSign({
			sign: {
				sub: winthorUser.winthorUserId,
				kaizenId: kaizenUser?.kaizenUserId,
				expiresIn: '7d'
			}
		})

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/token/refresh',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.status(200)
			.send({
				user: {
					winthorUserId: winthorUser.winthorUserId,
					kaizenUserId: kaizenUser?.kaizenUserId,
					name: winthorUser.name
				},
				token
			})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(403).send({ message: err.message })
		}

		throw err
	}
}
