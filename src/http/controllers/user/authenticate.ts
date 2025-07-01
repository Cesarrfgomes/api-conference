import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate'

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

	const authenticate = makeAuthenticateUseCase()

	const { user } = await authenticate.execute({ username, password })

	return reply.status(200).send({ user })
}
