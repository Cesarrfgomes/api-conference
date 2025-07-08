import { Factory } from '../types/Factory-type'

export interface FactoriesRepository {
	getFactoryByName(name: string): Promise<Factory | null>
	findFactories(): Promise<Factory[]>
	create(data: Factory): Promise<Factory>
}
