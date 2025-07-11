import { FastifyInstance } from 'fastify'
import { getUserByNameTag } from '../../controllers/user/get-user-by-name-tag'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get(
		'/usuarios',
		{
			schema: {
				tags: ['Users'],
				summary: 'Buscar usuários por name tags',
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
								'Name tags dos usuários separados por vírgula (ex: tag1,tag2,tag3)'
						}
					}
				},
				response: {
					200: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								kaizenId: { type: 'number' },
								winthorId: { type: 'number' }
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
