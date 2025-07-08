import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const verifyJWT = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		await request.jwtVerify()
	} catch (err: FastifyError) {
		if (err.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
			return reply.status(401).send({
				message: err.message,
				code: err.code,
				statusCode: err.statusCode
			})
		} else if (err.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
			return reply.status(401).send({
				message: err.message,
				code: err.code,
				statusCode: err.statusCode
			})
		} else {
			return reply.status(403).send({ message: 'Unauthorized.' })
		}
	}
}
