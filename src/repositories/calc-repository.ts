import { TCalc } from '../types/Calc-type'

export interface CreateCalc {
	product: string
	factory: string
	factorySt: number
	factoryIcms: number
	marginF6: number
	marginF2V: number
	marginF2A: number
	basePriceF6: number
	priceF6: number
	priceF2A: number
	priceF2V: number
	employee: number
	createdAt?: Date
}

export interface CalcProductPriceRepository {
	findUserCalcsByUserId(winthorUserId: number, page: number): Promise<TCalc[]>
	findUserCalcById(id: number, winthorUserId: number): Promise<TCalc | null>
	create(data: CreateCalc): Promise<void>
	delete(id: number): Promise<void>
}
