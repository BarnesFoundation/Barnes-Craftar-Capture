
import { Config } from '../utils/config'
import axios from 'axios'

class SearchService {

    httpConfig

    constructor() {
        this.httpConfig = {
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'post',
            url: Config.searchApiUrl,
            data: null
        }
    }

    async findImageMatch(image: Blob) {
        console.log(this.httpConfig.url)
        /* let fd = new FormData()

        fd.append('token', Config.collectionToken)
        fd.append('image', image)

        this.httpConfig.data = fd

        let response = await axios(this.httpConfig)
        console.log(response) */
    }

}

export { SearchService }