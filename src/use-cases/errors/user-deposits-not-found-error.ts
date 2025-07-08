export class NotFoundUserDepositsError extends Error {
	constructor() {
		super('O usuário não tem depósitos vinculados a ele.')
	}
}
