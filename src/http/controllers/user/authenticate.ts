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

		const { user } = await authenticate.execute({ username, password })

		const token = await reply.jwtSign({
			sub: user.matricula
		})

		return reply.status(200).send({ user, token })
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message })
		}

		throw err
	}
}
