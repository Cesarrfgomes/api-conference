export class UserUnauthorizedDepositAccessError extends Error {
	constructor() {
		super('Usuário não tem permissão de acesso à esse depósito.')
	}
}
