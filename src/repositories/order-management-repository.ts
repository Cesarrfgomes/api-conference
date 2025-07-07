import { OrderManagementType } from '../types/Order-management-type'

export interface OrderManagementRepository {
	findOmByNumber(omNumber: number): Promise<OrderManagementType[]>
	findOmDepositsByAddressId(
		addressId: number[]
	): Promise<Pick<{ deposit: number }, 'deposit'> | undefined>
}
