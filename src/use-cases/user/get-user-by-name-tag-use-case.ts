import { UserRepository } from '../../repositories/user-repository'
import { UserWinthorType } from '../../types/User-type'
import { NotFoundUserError } from '../errors/user-not-found-error'

interface GetUserByNameTagRequest {
	nameTags: string
}

interface GetUserByNameTagResponse {
	users: UserWinthorType[]
}
export class GetUserByNameTagUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		nameTags
	}: GetUserByNameTagRequest): Promise<GetUserByNameTagResponse> {
		// if (nameTags.length > 2) {
		// 	throw new MaximumUsersInAPartitionError()
		// }

		const users = await this.usersRepository.findUserByNameTag(nameTags)

		console.log(users)

		if (!users) {
			throw new NotFoundUserError()
		}

		return {
			users
		}
	}
}
