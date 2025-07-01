import { knexOracle } from '../../config/databases/oracle'
import { CalcProductPriceRepository, CreateCalc } from '../calc-repository'

export class KnexCalcProductPriceRepository
	implements CalcProductPriceRepository
{
	async create(data: CreateCalc) {
		await knexOracle('TABCALCULOFABRICA').insert({
			FABRICA: data.FABRICA,
			PRODDUTO: data.PRODDUTO,
			STFABRICA: data.STFABRICA,
			ICMSFABRICA: data.ICMSFABRICA,
			CODFUNC: data.CODFUNC,
			MARGEMF2ATC: data.MARGEMF2ATC,
			MARGEMF2VRJ: data.MARGEMF2VRJ,
			MARGEMF6: data.MARGEMF6,
			PBASEF6: data.PBASEF6,
			PVENDAF2ATC: data.PVENDAF2ATC,
			PVENDAF2VRJ: data.PVENDAF2VRJ,
			PVENDAF6: data.PVENDAF6
		})

		return
	}
}
