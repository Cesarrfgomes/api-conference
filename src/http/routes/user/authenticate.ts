import { FastifyInstance } from 'fastify'
import { authenticate } from '../../controllers/user/authenticate'

export async function authenticateRoutes(app: FastifyInstance) {
	app.post(
		'/login',
		{
			schema: {
				tags: ['Authentication'],
				summary: 'Autenticar usuário',
				description:
					'Autentica um usuário com username e password, retornando um JWT token',
				body: {
					type: 'object',
					required: ['username', 'password'],
					properties: {
						username: {
							type: 'string',
							description: 'Nome de usuário do winthor'
						},
						password: {
							type: 'string',
							description: 'Senha do usuário do winthor'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							winthorUser: {
								type: 'object',
								properties: {
									winthorUserId: { type: 'number' },
									username: { type: 'string' }
								}
							},
							kaizenUser: {
								type: 'object',
								properties: {
									kaizenUserId: { type: 'number' },
									name: { type: 'string' },
									kaizenUsername: { type: 'string' },
									isActive: { type: 'string' }
								}
							},
							token: {
								type: 'string',
								description: 'JWT token para autenticação'
							}
						}
					},
					401: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'As credenciais não coincidem.'
							}
						}
					}
				}
			}
		},
		authenticate
	)
}
