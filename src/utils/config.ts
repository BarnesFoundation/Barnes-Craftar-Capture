
const Config = {
    /** Craftar environment variables */
    managementApiUrl: process.env.REACT_APP_MANAGEMENT_API_URL,
    managementApiKey: process.env.REACT_APP_MANAGEMENT_API_KEY,

    collectionUuid: process.env.REACT_APP_COLLECTION_UUID,
    collectionToken: process.env.REACT_APP_COLLECTION_TOKEN,

    searchApiUrl: process.env.REACT_APP_SEARCH_API_URL,

    collectionRoute: process.env.REACT_APP_COLLECTION_EP,
    itemRoute: process.env.REACT_APP_ITEM_EP,
    imageRoute: process.env.REACT_APP_IMAGE_EP,

    /** ElasticSearch environment variables */
    esHost: process.env.REACT_APP_ES_HOST,
    esPort: process.env.REACT_APP_ES_PORT,
    esUsername: process.env.REACT_APP_ES_USERNAME,
    esPassword: process.env.REACT_APP_ES_PASSWORD
}

export { Config }