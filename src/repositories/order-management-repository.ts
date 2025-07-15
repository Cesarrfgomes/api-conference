import { OrderManagementType } from '../types/Order-management-type'

export interface OrderManagementRepository {
	findOmByNumber(omNumber: number): Promise<OrderManagementType[]>
	findOmDepositsByAddressId(
		addressId: number[]
	): Promise<Pick<{ deposit: number }, 'deposit'> | undefined>
	updateOmSeparation(
		omNumber: number,
		omData: OrderManagementType[]
	): Promise<void>
	updateOmInitSeparation(
		omNumber: number,
		date: string,
		omData: OrderManagementType[]
	): Promise<void>
	createOmOnWinthor(
		omData: OrderManagementType[],
		user1: number,
		user2: number | null
	): Promise<void>
}
