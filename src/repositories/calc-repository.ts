import { TCalc } from '../types/Calc-type'
import { Factory } from '../types/Factory-type'

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
	insertDate?: Date
}

export interface CalcProductPriceRepository {
	findUserCalc(): Promise<TCalc[]>
	findUserCalcById(id: number): Promise<TCalc | null>
	create(data: CreateCalc): Promise<void>
	delete(id: number): Promise<void>
}
