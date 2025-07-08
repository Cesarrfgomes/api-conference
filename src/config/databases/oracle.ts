import { knex as setupKnex, Knex } from 'knex'
import { env } from '../../env'
import { initOracleClient } from 'oracledb'

initOracleClient()

export const config: Knex.Config = {
	client: 'oracledb',
	connection: {
		host: env.ORACLE_HOST,
		port: env.ORACLE_PORT,
		user: env.ORACLE_USER,
		password: env.ORACLE_PASS,
		database: env.ORACLE_NAME
	}
}

export const knexOracle = setupKnex(config)
