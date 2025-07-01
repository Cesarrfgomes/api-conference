export class FactoryAlreadyExistsError extends Error {
	constructor() {
		super('Fábrica com esse nome já cadastrada.')
	}
}
