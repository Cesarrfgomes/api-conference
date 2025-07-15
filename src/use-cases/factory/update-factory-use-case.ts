import { FactoriesRepository } from '../../repositories/factories-repository'
import { NotFoundFactoryError } from '../errors/factory-not-found-error'

interface UpdateFactoryUseCaseRequest {
	id: number
	name: string
	icms: number
	st: number
	marginF6: number
	marginF2A: number
	marginF2V: number
}

interface UpdateFactoryUseCaseResponse {
	message: string
}

export class UpdateFactoryUseCase {
	constructor(private factoriesRepository: FactoriesRepository) {}

	async execute({
		id,
		name,
		icms,
		st,
		marginF6,
		marginF2A,
		marginF2V
	}: UpdateFactoryUseCaseRequest): Promise<UpdateFactoryUseCaseResponse> {
		const factory = await this.factoriesRepository.getFactoryById(id)

		if (!factory) {
			throw new NotFoundFactoryError()
		}

		await this.factoriesRepository.update(id, {
			name,
			icms,
			st,
			marginf6: marginF6,
			marginf2a: marginF2A,
			marginf2v: marginF2V
		})

		return {
			message: 'Fábrica atualizada com sucesso'
		}
	}
}
