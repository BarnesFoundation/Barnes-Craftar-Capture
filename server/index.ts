import * as express from 'express'
import * as path from 'path'
import { Config } from './config'

/** Set up server constants */
const app = express()
const port = Config.port
const buildDir = path.join(__dirname, '../build')


/** Express serves the build directory */
app.use(express.static(buildDir))

app.use('*', (request, response) => {
    response.sendFile(path.join(buildDir, 'index.html'));
})

app.listen(port, () => {
    console.log('Server running on port:' , port)
})