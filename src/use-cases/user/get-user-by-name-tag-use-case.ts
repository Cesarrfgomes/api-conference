import { UserRepository } from '../../repositories/user-repository'
import { UserKaizenType, UserWinthorType } from '../../types/User-type'
import { NotFoundUserError } from '../errors/user-not-found-error'

interface GetUserByNameTagRequest {
	nameTag: string
}

interface GetUserByNameTagResponse {
	winthorUser: UserWinthorType
	kaizenUser: UserKaizenType | null
}
export class GetUserByNameTagUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		nameTag
	}: GetUserByNameTagRequest): Promise<GetUserByNameTagResponse> {
		const winthorUser = await this.usersRepository.findUserByNameTag(
			nameTag
		)

		if (!winthorUser) {
			throw new NotFoundUserError()
		}

		const kaizenUser = await this.usersRepository.findKaizenUserByErpCode(
			winthorUser.winthorUserId
		)

		return { winthorUser, kaizenUser }
	}
}
