import { knex as setupKnex, Knex } from 'knex'
import { env } from '../../env'

export const config: Knex.Config = {
	client: 'pg',
	connection: {
		host: env.PG_HOST,
		port: env.PG_PORT,
		user: env.PG_USER,
		password: env.PG_PASS,
		database: env.PG_NAME
	}
}

export const knexPg = setupKnex(config)
