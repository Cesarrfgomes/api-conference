import { UserRepository } from '../../repositories/user-repository'
import { UserKaizenType, UserWinthorType } from '../../types/User-type'
import { NotFoundUserError } from '../errors/user-not-found-error'

interface GetUserByNameTagRequest {
	nameTags: string
}

interface GetUserByNameTagResponse {
	winthorUserId: UserWinthorType[]
}
export class GetUserByNameTagUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		nameTags
	}: GetUserByNameTagRequest): Promise<GetUserByNameTagResponse> {
		const winthorUserId = await this.usersRepository.findUserByNameTag(
			nameTags
		)

		console.log(winthorUserId)

		if (!winthorUserId) {
			throw new NotFoundUserError()
		}

		return {
			winthorUserId
		}
	}
}
