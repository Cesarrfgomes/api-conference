export class MaximumUsersInAPartitionError extends Error {
	constructor() {
		super('Quantidade máxima de separadores atingida.')
	}
}
