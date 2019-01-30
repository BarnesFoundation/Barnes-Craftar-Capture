import * as ElasticSearch from 'elasticsearch'
import { ItemSearchService, SearchResponse } from './itemSearchService'
import { Config } from '../utils/config'

class ElasticSearchResponse {
    success: boolean
    id: string
    invno: string
}

class InvnoResponse {
    idResponse?: SearchResponse | any
    success: boolean
    id?: string
}

class InvnoSearchService {

    esClient: ElasticSearch.Client
    itemSearchService: ItemSearchService

    constructor() {

        this.itemSearchService = new ItemSearchService()

        const protocol = 'https://'
        const address = Config.esHost + ':' + Config.esPort
        const httpAuth = Config.esUsername + ':' + Config.esPassword

        const host = protocol + httpAuth + '@' + address

        this.esClient = new ElasticSearch.Client({
            hosts: [host]
        })
    }

    async searchByInvno(invno: string): Promise<InvnoResponse> {

        // Get the results this invno
        let results = await this.getId(invno)

        let invnoResponse = new InvnoResponse()

        if (results.length > 0) {
            let result = results[0]._source as ElasticSearchResponse
            let id = result.id

            invnoResponse.success = true
            invnoResponse.idResponse = await this.itemSearchService.searchByItem(id)
            invnoResponse.id = id
        }

        else {
            invnoResponse.success = false
            invnoResponse.idResponse = { }
        }

        return invnoResponse
    }

    private async getId(invno: string): Promise<any> {

        // Execute the search
        const response = await this.esClient.search({
            index: 'collection',
            body: {
                size: 1,
                query: {
                    bool: {
                        must: {
                            match: {
                                'invno': invno
                            }
                        }
                    }
                },
                _source: [
                    'id',
                    'invno'
                ]
            }
        })

        // Return the actual object data
        return response.hits.hits
    }
}

export { InvnoSearchService, InvnoResponse }