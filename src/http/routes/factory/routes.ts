import { FastifyInstance } from 'fastify'
import { createFactory } from '../../controllers/factory/create'
import { findFactories } from '../../controllers/factory/find'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { getFactoryByName } from '../../controllers/factory/get'

export async function factoriesRoutes(app: FastifyInstance) {
	app.post(
		'/factories',
		{
			onRequest: [verifyJWT, verifyUserRoutineAccess(9816)],
			schema: {
				tags: ['Factories'],
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
							description: 'Margem para filial 2V'
						},
						marginF2A: {
							type: 'number',
							description: 'Margem para filial 2A'
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
		'/factories',
		{
			schema: {
				tags: ['Factories'],
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
										name: { type: 'string' }
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
		'/factories/:name',
		{
			onRequest: [verifyJWT, verifyUserRoutineAccess(9816)],
			schema: {
				tags: ['Factories'],
				summary: 'Buscar fábrica por nome',
				description: 'Busca uma fábrica específica pelo nome',
				security: [{ Bearer: [] }],
				params: {
					type: 'object',
					required: ['name'],
					properties: {
						name: {
							type: 'string',
							description: 'Nome da fábrica'
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
		getFactoryByName
	)
}
