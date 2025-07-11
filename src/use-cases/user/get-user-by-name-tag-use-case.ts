import { UserRepository } from '../../repositories/user-repository'
import { MaximumUsersInAPartitionError } from '../errors/maximum-users-in-partition-reached-error'
import { NotFoundUserError } from '../errors/user-not-found-error'

interface GetUserByNameTagRequest {
	nameTags: string
}

interface GetUserByNameTagResponse {
	users: {
		kaizenId: number
		winthorId: number
	}[]
}
export class GetUserByNameTagUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		nameTags
	}: GetUserByNameTagRequest): Promise<GetUserByNameTagResponse> {
		if (nameTags.split(',').length > 2) {
			throw new MaximumUsersInAPartitionError()
		}
		const users = await this.usersRepository.findUserByNameTag(nameTags)

		if (!users) {
			throw new NotFoundUserError()
		}

		return {
			users
		}
	}
}
