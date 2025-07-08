import { FactoriesRepository } from '../../repositories/factories-repository'
import { Factory } from '../../types/Factory-type'
import { FactoryAlreadyExistsError } from '../errors/factory-already-exists-error'

interface CreateFactoryUseCaseRequest {
	name: string
	icms: number
	st: number
	marginF6: number
	marginF2A: number
	marginF2V: number
}

interface CreateFactoryUseCaseResponse {
	factory: Factory
}

export class CreateFactoryUseCase {
	constructor(private factoriesRepository: FactoriesRepository) {}

	async execute({
		name,
		icms,
		st,
		marginF6,
		marginF2A,
		marginF2V
	}: CreateFactoryUseCaseRequest): Promise<CreateFactoryUseCaseResponse> {
		const factoryWithSameName =
			await this.factoriesRepository.getFactoryByName(name)

		if (factoryWithSameName) {
			throw new FactoryAlreadyExistsError()
		}

		const factory = await this.factoriesRepository.create({
			name,
			icms,
			st,
			marginf6: marginF6,
			marginf2a: marginF2A,
			marginf2v: marginF2V
		})

		return {
			factory
		}
	}
}
