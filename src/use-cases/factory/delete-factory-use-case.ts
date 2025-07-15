import { FactoriesRepository } from '../../repositories/factories-repository'
import { NotFoundFactoryError } from '../errors/factory-not-found-error'

interface DeleteFactoryUseCaseRequest {
	id: number
}

interface DeleteFactoryUseCaseResponse {
	message: string
}

export class DeleteFactoryUseCase {
	constructor(private factoriesRepository: FactoriesRepository) {}

	async execute({
		id
	}: DeleteFactoryUseCaseRequest): Promise<DeleteFactoryUseCaseResponse> {
		const factory = await this.factoriesRepository.getFactoryById(id)

		if (!factory) {
			throw new NotFoundFactoryError()
		}

		await this.factoriesRepository.delete(id)
		return {
			message: 'Fábrica deletada com sucesso'
		}
	}
}
