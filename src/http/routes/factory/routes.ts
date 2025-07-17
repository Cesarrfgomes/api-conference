import { FastifyInstance } from 'fastify'
import { createFactory } from '../../controllers/factory/create'
import { findFactories } from '../../controllers/factory/find'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { getFactoryById } from '../../controllers/factory/get'
import { updateFactory } from '../../controllers/factory/update'
import { deleteFactory } from '../../controllers/factory/delete'

export async function factoriesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.post(
		'/factories',
		{
			onRequest: [verifyUserRoutineAccess(9816)],
			schema: {
				tags: ['Fábricas'],
				summary: 'Criar nova fábrica',
				description:
					'Cria uma nova fábrica no sistema com os dados fornecidos',
				security: [{ Bearer: [] }],
				body: {
					type: 'object',
					required: [
						'name',
						'icms',
						'st',
						'marginF2V',
						'marginF2A',
						'marginF6'
					],
					properties: {
						name: {
							type: 'string',
							description: 'Nome da fábrica'
						},
						icms: {
							type: 'number',
							description: 'Percentual de ICMS'
						},
						st: {
							type: 'number',
							description: 'Percentual de ST'
						},
						marginF2V: {
							type: 'number',
							description: 'Margem para filial 2 Varejo'
						},
						marginF2A: {
							type: 'number',
							description: 'Margem para filial 2 Atacado'
						},
						marginF6: {
							type: 'number',
							description: 'Margem para filial 6'
						}
					}
				},
				response: {
					201: {
						type: 'object',
						properties: {
							factoryCode: { type: 'number' },
							name: { type: 'string' },
							icms: { type: 'number' },
							st: { type: 'number' },
							marginf2a: { type: 'number' },
							marginf2v: { type: 'number' },
							marginf6: { type: 'number' },
							active: { type: 'string' }
						}
					},
					409: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Fábrica com esse nome já cadastrada.'
							}
						}
					}
				}
			}
		},
		createFactory
	)

	app.get(
		'/fabricas',
		{
			schema: {
				tags: ['Fábricas'],
				summary: 'Listar todas as fábricas',
				description:
					'Retorna uma lista de todas as fábricas cadastradas no sistema',
				response: {
					200: {
						type: 'object',
						properties: {
							factories: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										factoryCode: { type: 'number' },
										name: { type: 'string' },
										icms: { type: 'number' },
										st: { type: 'number' },
										marginf6: { type: 'number' },
										marginf2a: { type: 'number' },
										marginf2v: { type: 'number' },
										isActive: { type: 'string' }
									}
								}
							}
						}
					}
				}
			}
		},
		findFactories
	)

	app.get(
		'/fabricas/:id',
		{
			onRequest: [verifyUserRoutineAccess(9816)],
			schema: {
				tags: ['Fábricas'],
				summary: 'Buscar fábrica por ID',
				description: 'Busca uma fábrica específica pelo ID',
				security: [{ Bearer: [] }],
				params: {
					type: 'object',
					required: ['id'],
					properties: {
						id: {
							type: 'number',
							description: 'ID da fábrica'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							factory: {
								type: 'object',
								properties: {
									factoryCode: { type: 'number' },
									name: { type: 'string' },
									icms: { type: 'number' },
									st: { type: 'number' },
									marginf2a: { type: 'number' },
									marginf2v: { type: 'number' },
									marginf6: { type: 'number' },
									active: { type: 'string' }
								}
							}
						}
					},
					404: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Factory not found'
							}
						}
					}
				}
			}
		},
		getFactoryById
	)

	app.put(
		'/fabricas/:id',
		{
			schema: {
				tags: ['Fábricas'],
				summary: 'Atualizar uma fábrica',
				description:
					'Atualiza os dados de uma fábrica existente pelo ID',
				security: [{ Bearer: [] }],
				params: {
					type: 'object',
					required: ['id'],
					properties: {
						id: { type: 'number', description: 'ID da fábrica' }
					}
				},
				body: {
					type: 'object',
					required: [
						'name',
						'icms',
						'st',
						'marginF2V',
						'marginF2A',
						'marginF6'
					],
					properties: {
						name: {
							type: 'string',
							description: 'Nome da fábrica'
						},
						icms: {
							type: 'number',
							description: 'Percentual de ICMS'
						},
						st: { type: 'number', description: 'Percentual de ST' },
						marginF2V: {
							type: 'number',
							description: 'Margem para filial 2 Varejo'
						},
						marginF2A: {
							type: 'number',
							description: 'Margem para filial 2 Atacado'
						},
						marginF6: {
							type: 'number',
							description: 'Margem para filial 6'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Fábrica atualizada com sucesso!'
							}
						}
					},
					400: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Fábrica com esse nome já cadastrada.'
							}
						}
					}
				}
			}
		},
		updateFactory
	)

	app.delete(
		'/fabricas/:id',
		{
			onRequest: [verifyUserRoutineAccess(9816)],
			schema: {
				tags: ['Fábricas'],
				summary: 'Deletar uma fábrica',
				description: 'Deleta uma fábrica existente pelo ID',
				security: [{ Bearer: [] }],
				params: {
					type: 'object',
					required: ['id'],
					properties: {
						id: { type: 'number', description: 'ID da fábrica' }
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Fábrica deletada com sucesso'
							}
						}
					},
					404: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Fábrica não encontrada.'
							}
						}
					}
				}
			}
		},
		deleteFactory
	)
}
