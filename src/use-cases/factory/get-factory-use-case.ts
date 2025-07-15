import { FactoriesRepository } from '../../repositories/factories-repository'
import { Factory } from '../../types/Factory-type'

interface GetFactoryUseCaseRequest {
	id: number
}

interface GetFactoryUseCaseResponse {
	factory: Factory | null
}

export class GetFactoryUseCase {
	constructor(private factoriesRepository: FactoriesRepository) {}

	async execute({
		id
	}: GetFactoryUseCaseRequest): Promise<GetFactoryUseCaseResponse> {
		const factory = await this.factoriesRepository.getFactoryById(id)
		return {
			factory
		}
	}
}
