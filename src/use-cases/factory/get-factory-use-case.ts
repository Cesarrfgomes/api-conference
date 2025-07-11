import { FactoriesRepository } from '../../repositories/factories-repository'
import { Factory } from '../../types/Factory-type'

interface GetFactoryUseCaseRequest {
	name: string
}

interface GetFactoryUseCaseResponse {
	factory: Factory | null
}

export class GetFactoryUseCase {
	constructor(private factoriesRepository: FactoriesRepository) {}

	async execute({
		name
	}: GetFactoryUseCaseRequest): Promise<GetFactoryUseCaseResponse> {
		const factory = await this.factoriesRepository.getFactoryByName(name)
		return {
			factory
		}
	}
}
