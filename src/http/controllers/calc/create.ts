import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCalcProductPriceUseCase } from '../../../use-cases/factories/make-create-product-price-use-case'

export async function calcProductPrice(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const createCalcProductPriceBodySchema = z.object({
		factory: z.string(),
		product: z.string(),
		initialPrice: z.coerce.number(),
		percIpi: z.coerce.number(),
		shippingPrice: z.coerce.number(),
		weight: z.coerce.number()
	})

	const { factory, initialPrice, percIpi, shippingPrice, weight, product } =
		createCalcProductPriceBodySchema.parse(request.body)

	try {
		const createCalc = makeCreateCalcProductPriceUseCase()

		const { filial2A, filial2V, filial6 } = await createCalc.execute({
			factory,
			product,
			initialPrice,
			percIpi,
			shippingPrice,
			weight,
			userId: request.user.sub
		})

		return reply
			.status(200)
			.send({
				filial2A,
				filial2V,
				filial6,
				message: 'Cálculo realizado com sucesso!'
			})
	} catch (err) {
		console.error(err)

		throw new Error('nada')
	}
}
