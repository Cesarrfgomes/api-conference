import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const verifyJWT = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		await request.jwtVerify()
	} catch (err) {
		if (
			typeof err === 'object' &&
			err !== null &&
			'code' in err &&
			'message' in err &&
			'statusCode' in err
		) {
			const code = (err as any).code
			const message = (err as any).message
			const statusCode = (err as any).statusCode
			if (code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
				return reply.status(401).send({
					message,
					code,
					statusCode
				})
			} else if (code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
				return reply.status(401).send({
					message,
					code,
					statusCode
				})
			}
		}
		return reply.status(403).send({ message: 'Unauthorized.' })
	}
}
