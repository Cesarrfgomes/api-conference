import { FastifyInstance } from 'fastify'
import { getOmByNumber } from '../../controllers/order-management/om'
import { finalizeSeparation } from '../../controllers/order-management/finalize-separation'
import { initSeparation } from '../../controllers/order-management/init-separation'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserDepositAccess } from '../../middlewares/verify-user-deposit'
import { cancelSeparation } from '../../controllers/order-management/cancel-separation'

export async function orderManagementRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get(
		'/om/:id',
		{
			onRequest: [verifyUserDepositAccess],
			schema: {
				tags: ['Gerenciamento de OMs'],
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

	app.post(
		'/om/:id/separacao/iniciar',
		{
			onRequest: [verifyUserDepositAccess],
			schema: {
				tags: ['Gerenciamento de OMs'],
				summary: 'Iniciar separação da OM',
				description:
					'Inicia a separação de uma OM, definindo data_inicio_separacao com timestamp atual',
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
							message: {
								type: 'string',
								example: 'Separação iniciada com sucesso!'
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
		initSeparation
	)

	app.post(
		'/om/:id/separacao/finalizar',
		{
			onRequest: [verifyUserDepositAccess],
			schema: {
				tags: ['Gerenciamento de OMs'],
				summary: 'Finalizar separação da OM',
				description:
					'Finaliza a separação de uma OM, definindo separatedQt igual a qt para todos os produtos',
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
							message: {
								type: 'string',
								example: 'Separação finalizada com sucesso!'
							},
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
		finalizeSeparation
	)

	app.patch(
		'/om/:id/separacao/cancelar',
		{
			onRequest: [verifyUserDepositAccess],
			schema: {
				tags: ['Gerenciamento de OMs'],
				summary: 'Cancelar separação da OM',
				description:
					'Cancelar a separação de uma OM, definindo data_inicio_separacao como null',
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
							message: {
								type: 'string',
								example: 'Separação cancelada com sucesso!'
							}
						}
					}
				}
			}
		},
		cancelSeparation
	)
}
