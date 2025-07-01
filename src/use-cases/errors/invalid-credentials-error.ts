export class InvalidCredentialsError extends Error {
	constructor() {
		super('As credenciais nao coincidem.')
	}
}
