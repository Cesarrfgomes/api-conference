import { UserType } from '../types/User-type'

export interface UserRepository {
	findUserByUsername(username: string): Promise<UserType | null>
}
