import { Factory } from '../types/Factory-type'

export interface FactoriesRepository {
	getFactoryByName(name: string): Promise<Factory | null>
	create(data: Factory): Promise<Factory>
}
