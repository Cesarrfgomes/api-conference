import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { makeGetUserByNameTagUseCase } from '../../../use-cases/factories/make-get-user-by-name-tag-use-case'

export async function getUserByNameTag(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getUserByNameTagQuerySchema = z.object({
		nameTags: z.string().optional()
	})

	const { nameTags } = getUserByNameTagQuerySchema.parse(request.query)

	if (nameTags) {
		try {
			const getUser = makeGetUserByNameTagUseCase()

			const { users } = await getUser.execute({
				nameTags
			})

			return reply.status(200).send({ users })
		} catch (err) {
			if (err instanceof InvalidCredentialsError) {
				return reply.status(400).send({ message: err.message })
			}

			throw err
		}
	}
}
