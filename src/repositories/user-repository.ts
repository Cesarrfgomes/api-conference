import { UserKaizenType, UserWinthorType } from '../types/User-type'

export interface UserRepository {
	findUserByNameTag(nameTags: string): Promise<
		{
			kaizenId: number
			winthorId: number
		}[]
	>
	findWinthorUserById(userId: number): Promise<UserWinthorType | null>
	findKaizenUserByErpCode(
		winthorUserId: number
	): Promise<UserKaizenType | null>
	findUserDepositsByKaizenId(
		userId: number
	): Promise<Pick<{ deposit: number }, 'deposit'>[]>
	findWinthorUserByUsername(username: string): Promise<UserWinthorType | null>
	getWinthorUserPasswordByUsername(username: string): Promise<string | null>
}
