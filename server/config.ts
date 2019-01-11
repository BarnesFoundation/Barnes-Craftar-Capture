import * as dotenv from 'dotenv'
import * as path from 'path'

const envPath = path.join(__dirname, '../.env')

dotenv.config({ path: envPath })

const Config = {

    port: process.env.PORT
}

export { Config }