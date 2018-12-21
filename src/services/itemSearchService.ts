import { Config } from '../utils/config'
import { ItemSearchResponse } from '../interfaces/managementResponses'
import axios from 'axios'

class SearchResponse {
    success: boolean
    uuid?: string
    name?: string
}

class ItemSearchService {

    httpConfig

    constructor() {
        this.httpConfig = {
            url: Config.managementApiUrl + Config.itemRoute + '/',
            method: 'get',
            params: {
                api_key: Config.managementApiKey,
                collection_uuid: Config.collectionUuid,
                name: null
            }
        }
    }

    private prepareRequest = (itemId: string) => {
        this.httpConfig.params.name = itemId
        return this.httpConfig
    }

    private parseResponse = (response: ItemSearchResponse[]): SearchResponse => {

        let searchResponse = new SearchResponse()

        if (response.length > 0) {
            searchResponse.success = true
            searchResponse.uuid = response[0].uuid
            searchResponse.name = response[0].name
        }

        else {
            searchResponse.success = false
        }
        return searchResponse
    }

    searchByItem = async (itemId: string): Promise<SearchResponse> => {
        let request = this.prepareRequest(itemId)
        let searchResponse

        try {
            let response = await axios(request)
            searchResponse = this.parseResponse(response.data.objects)
        }

        catch (error) {
            console.log(error)
        }

        return searchResponse
    }
}

export { ItemSearchService, SearchResponse }