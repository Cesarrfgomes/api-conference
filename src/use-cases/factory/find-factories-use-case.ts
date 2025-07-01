import { FactoriesRepository } from '../../repositories/factories-repository'
import { Factory } from '../../types/Factory-type'
import { FactoryAlreadyExistsError } from '../errors/factory-already-exists-error'

interface FindFactoriesUseCaseResponse {
	factories: Factory[]
}

export class FindFactoriesUseCase {
	constructor(private factoriesRepository: FactoriesRepository) {}

	async execute(): Promise<FindFactoriesUseCaseResponse> {
		const factories = await this.factoriesRepository.findFactories()

		return {
			factories
		}
	}
}
