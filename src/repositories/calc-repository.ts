import { Factory } from '../types/Factory-type'

export interface CreateCalc {
	PRODDUTO: string
	FABRICA: string
	STFABRICA: number
	ICMSFABRICA: number
	MARGEMF6: number
	MARGEMF2VRJ: number
	MARGEMF2ATC: number
	PBASEF6: number
	PVENDAF6: number
	PVENDAF2ATC: number
	PVENDAF2VRJ: number
	CODFUNC: number
	DTINCLUSAO?: Date
}

export interface CalcProductPriceRepository {
	create(data: CreateCalc): Promise<void>
}
