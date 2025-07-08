import { FactoriesRepository } from '../../repositories/factories-repository'
import { Factory } from '../../types/Factory-type'

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
