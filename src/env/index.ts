import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	PG_HOST: z.string(),
	PG_PORT: z.coerce.number(),
	PG_USER: z.string(),
	PG_NAME: z.string(),
	PG_PASS: z.string(),
	ORACLE_HOST: z.string(),
	ORACLE_PORT: z.coerce.number(),
	ORACLE_USER: z.string(),
	ORACLE_NAME: z.string(),
	ORACLE_PASS: z.string(),
	JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('Invalid environment variables', _env.error.format())

	throw new Error('Invalid environment variables')
}

export const env = _env.data
