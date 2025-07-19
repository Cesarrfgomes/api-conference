import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(
	request: FastifyRequest,
	reply: FastifyReply
) {
	await request.jwtVerify({ onlyCookie: true })

	const { sub, kaizenId } = request.user

	const token = await reply.jwtSign({
		sign: {
			sub,
			kaizenId
		}
	})

	const refreshToken = await reply.jwtSign({
		sign: {
			sub,
			kaizenId,
			expiresIn: '7d'
		}
	})

	return reply
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: true
		})
		.status(200)
		.send({ token })
}
