import { UserWinthorType } from '../types/User-type'

export interface UserRepository {
	findWitnhorUserById(userId: number): Promise<UserWinthorType | null>
	findWinthorUserByUsername(username: string): Promise<UserWinthorType | null>
	getWinthorUserPasswordByUsername(username: string): Promise<string | null>
}
