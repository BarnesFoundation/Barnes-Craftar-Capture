import * as dotenv from 'dotenv'

dotenv.config({ debug: true })

const Config = {
    managementApiUrl: process.env.MANAGEMENT_API_URL,
    managementApiKey: process.env.MANAGEMENT_API_KEY,

    collectionId: process.env.COLLECTION_UUID,
    collectionToken: process.env.COLLECTION_TOKEN,

    searchApiUrl: process.env.SEARCH_API_URL,

    collectionRoute: process.env.COLLECTION_EP,
    itemRoute: process.env.ITEM_EP,
    imageRoute: process.env.IMAGE_EP
}
console.log('Within config', __dirname)
console.log(Config)

export { Config }