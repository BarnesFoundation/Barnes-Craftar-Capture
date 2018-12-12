
import { Config } from '../utils/config'
import { CatchoomResponse } from '../interfaces/catchoomResponse'
import axios from 'axios'

class MatchResponse {
    success: boolean
    message: string
    id?: string
    uuid?: string
    url?: string

    errorOccurred?: boolean
    errorMessage?: string
}

class SearchService {

    httpConfig

    constructor() {
        this.httpConfig = {
            headers: { 'Content-Type': 'multipart/form-data' }, 'crossDomain': true,
            method: 'post',
            url: Config.searchApiUrl,
            data: null
        }
    }

    private prepareSearchRequest(image: Blob) {
        let fd = new FormData()

        fd.append('token', Config.collectionToken)
        fd.append('image', image)

        this.httpConfig.data = fd

        return this.httpConfig
    }

    private parseImageMatchResponse(response: CatchoomResponse): MatchResponse {
        let matchResponse = new MatchResponse()

        if (response.results.length > 0) {

            let result = response.results[0]

            matchResponse.success = true
            matchResponse.message = 'A matching reference image was found'
            matchResponse.id = result.item.name
            matchResponse.uuid = result.item.uuid
        }

        else {
            matchResponse.success = false
            matchResponse.message = 'No matching reference image was found'
        }

        return matchResponse
    }

    private parseErrorResponse(error): string {
        let status = error.response.status
        let errorCode = error.response.data.error.code
        let errorMessage = error.response.data.error.message
        
        return 'ErrorCode: ' + errorCode + ' ErrorMessage: ' + errorMessage 
    }

    async findImageMatch(image: Blob): Promise<MatchResponse> {
        let request = this.prepareSearchRequest(image)

        try {
            let response = await axios(request)
            let matchResponse = this.parseImageMatchResponse(response.data)
            return matchResponse
        }

        catch (error) {
            let message = this.parseErrorResponse(error)
            throw message
        }
    }

}

export { SearchService }