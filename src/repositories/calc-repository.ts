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
	create(data: CreateCalc): Promise<void>
}
