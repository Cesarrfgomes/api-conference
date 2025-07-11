import { FastifyInstance } from 'fastify'
import { getOmByNumber } from '../../controllers/order-management/om'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserDepositAccess } from '../../middlewares/verify-user-deposit'

export async function orderManagementRoutes(app: FastifyInstance) {
	app.get(
		'/om/:id',
		{
			onRequest: [verifyJWT, verifyUserDepositAccess],
			schema: {
				tags: ['Order Management'],
				summary: 'Buscar ordem de movimentação por número',
				description:
					'Busca uma ordem de movimentação específica e verifica se os usuários têm acesso ao depósito',
				security: [{ Bearer: [] }],
				params: {
					type: 'object',
					required: ['id'],
					properties: {
						id: {
							type: 'number',
							description: 'Número da ordem de movimentação'
						}
					}
				},
				querystring: {
					type: 'object',
					required: ['kaizenIds'],
					properties: {
						kaizenIds: {
							type: 'string',
							description:
								'IDs dos usuários Kaizen separados por vírgula (ex: 1,2,3)'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							omItems: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										codprod: { type: 'string' },
										qt: { type: 'number' },
										separateQt: { type: 'number' },
										checkedQt: { type: 'number' },
										addressId: { type: 'number' }
									}
								}
							}
						}
					},
					404: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Om não encontrada.'
							}
						}
					},
					403: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example:
									'Usuário não tem permissão de acesso à esse depósito.'
							}
						}
					}
				}
			}
		},
		getOmByNumber
	)
}
