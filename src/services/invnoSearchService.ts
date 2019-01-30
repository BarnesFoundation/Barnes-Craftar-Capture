import * as ElasticSearch from 'elasticsearch'
import { Config } from '../utils/config'

class InvnoSearchService {

    esClient: ElasticSearch.Client

    constructor() {

        const protocol = 'https://'
        const address = Config.esHost + ':' + Config.esPort
        const httpAuth = Config.esUsername + ':' + Config.esPassword

        const host = protocol + httpAuth + '@' + address

        this.esClient = new ElasticSearch.Client({
            hosts: [host]
        })
    }

    async searchByInvno(invno: string): Promise<any> {

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

export { InvnoSearchService }