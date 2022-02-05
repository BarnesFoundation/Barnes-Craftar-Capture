import * as dotenv from 'dotenv'
import * as path from 'path'

const envPath = path.join(__dirname, '../.env')

dotenv.config({ path: envPath })

const Config = {
	nodeEnv: process.env.NODE_ENV as 'PRODUCTION' | 'DEVELOPMENT' | 'LOCAL',
    port: process.env.PORT
}

export { Config }