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
			NOME: name,
			ICMS: icms,
			ST: st,
			MARGEMF2A: marginF2A,
			MARGEMF6: marginF6,
			MARGEMF2V: marginF2V
		})

		return {
			factory
		}
	}
}
