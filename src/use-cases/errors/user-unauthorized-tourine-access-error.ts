export class UserUnauthorizedRoutineAccessError extends Error {
	constructor() {
		super('Usuário não tem permissão de acesso à rotina.')
	}
}
