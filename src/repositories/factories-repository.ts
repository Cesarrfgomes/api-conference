import { Factory } from '../types/Factory-type'

export interface FactoriesRepository {
	getFactoryByName(name: string): Promise<Factory | null>
	getFactoryById(id: number): Promise<Factory | null>
	findFactories(): Promise<Factory[]>
	create(data: Factory): Promise<Factory>
	delete(id: number): Promise<void>
	update(id: number, data: Factory): Promise<void>
}
