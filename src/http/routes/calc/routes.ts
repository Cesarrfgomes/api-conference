import { FastifyInstance } from 'fastify'
import { calcProductPrice } from '../../controllers/calc/create'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRoutineAccess } from '../../middlewares/verify-user-routine-access'
import { findUserCalcs } from '../../controllers/calc/find-user-calcs'
import { getUserCalcById } from '../../controllers/calc/get-user-calc'

export async function calcProductPriceRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)
	app.addHook('onRequest', verifyUserRoutineAccess(9816))

	app.post(
		'/calculos',
		{
			schema: {
				tags: ['Calculations'],
				summary: 'Criar cálculo de preço de produto',
				description:
					'Cria um novo cálculo de preço de produto baseado na fábrica e parâmetros fornecidos',
				security: [{ Bearer: [] }],
				body: {
					type: 'object',
					required: [
						'factory',
						'product',
						'initialPrice',
						'percIpi',
						'shippingPrice',
						'weight'
					],
					properties: {
						factory: {
							type: 'string',
							description: 'Nome da fábrica'
						},
						product: {
							type: 'string',
							description: 'Código do produto'
						},
						initialPrice: {
							type: 'number',
							description: 'Preço inicial do produto'
						},
						percIpi: {
							type: 'number',
							description: 'Percentual de IPI'
						},
						shippingPrice: {
							type: 'number',
							description: 'Preço do frete'
						},
						weight: {
							type: 'number',
							description: 'Peso do produto'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							filial2A: {
								type: 'object',
								description: 'Cálculo para filial 2A'
							},
							filial2V: {
								type: 'object',
								description: 'Cálculo para filial 2V'
							},
							filial6: {
								type: 'object',
								description: 'Cálculo para filial 6'
							},
							message: {
								type: 'string',
								example: 'Cálculo realizado com sucesso!'
							}
						}
					}
				}
			}
		},
		calcProductPrice
	)

	app.get(
		'/calculos',
		{
			schema: {
				tags: ['Calculations'],
				summary: 'Listar cálculos do usuário',
				description:
					'Retorna uma lista paginada dos cálculos realizados pelo usuário autenticado',
				security: [{ Bearer: [] }],
				querystring: {
					type: 'object',
					properties: {
						page: {
							type: 'number',
							default: 1,
							description: 'Número da página'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							calcs: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										id: { type: 'number' },
										factory: { type: 'string' },
										product: { type: 'string' },
										factoryIcms: { type: 'number' },
										factorySt: { type: 'number' },
										basePriceF6: { type: 'number' },
										marginF6: { type: 'number' },
										marginF2A: { type: 'number' },
										marginF2V: { type: 'number' },
										priceF6: { type: 'number' },
										priceF2A: { type: 'number' },
										priceF2V: { type: 'number' },
										employee: { type: 'number' },
										createdAt: { type: 'string' }
									}
								}
							}
						}
					}
				}
			}
		},
		findUserCalcs
	)

	app.get(
		'/calculos/:id',
		{
			schema: {
				tags: ['Calculations'],
				summary: 'Buscar cálculo por ID',
				description: 'Busca um cálculo específico pelo ID',
				security: [{ Bearer: [] }],
				params: {
					type: 'object',
					required: ['id'],
					properties: {
						id: {
							type: 'number',
							description: 'ID do cálculo'
						}
					}
				},
				response: {
					200: {
						type: 'object',
						properties: {
							calc: {
								type: 'object',
								properties: {
									id: { type: 'number' },
									factory: { type: 'string' },
									product: { type: 'string' },
									factoryIcms: { type: 'number' },
									factorySt: { type: 'number' },
									basePriceF6: { type: 'number' },
									marginF6: { type: 'number' },
									marginF2A: { type: 'number' },
									marginF2V: { type: 'number' },
									priceF6: { type: 'number' },
									priceF2A: { type: 'number' },
									priceF2V: { type: 'number' },
									employee: { type: 'number' },
									createdAt: { type: 'string' }
								}
							}
						}
					},
					404: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Cálculo não encontrado'
							}
						}
					}
				}
			}
		},
		getUserCalcById
	)
}
