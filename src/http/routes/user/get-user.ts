import { FastifyInstance } from 'fastify'
import { getUserByNameTag } from '../../controllers/user/get-user-by-name-tag'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get(
		'/usuarios/cracha',
		{
			schema: {
				tags: ['Usuários'],
				summary: 'Buscar usuários por seus crachás',
				description:
					'Busca usuários no sistema usando name tags separados por vírgula',
				security: [{ Bearer: [] }],
				querystring: {
					type: 'object',
					required: ['nameTags'],
					properties: {
						nameTags: {
							type: 'string',
							description:
								'Name tags dos usuários separados por vírgula (ex: tag1,tag2)'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							users: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										kaizenId: { type: 'number' },
										winthorId: { type: 'number' }
									}
								}
							}
						}
					},
					401: {
						type: 'object',
						properties: {
							message: { type: 'string' }
						}
					},
					404: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Usuário não encontrado.'
							}
						}
					}
				}
			}
		},
		getUserByNameTag
	)
}
