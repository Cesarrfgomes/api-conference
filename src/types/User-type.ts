export type UserType = {
	id: number
	ativo: string
	chapaerp: number
	login: string
	nome: string
	senha?: string
}

export type UserDepositsType = {
	deposito: number
	usuario_id: number
}
