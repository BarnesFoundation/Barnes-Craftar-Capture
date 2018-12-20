
const Config = {
    managementApiUrl: process.env.REACT_APP_MANAGEMENT_API_URL,
    managementApiKey: process.env.REACT_APP_MANAGEMENT_API_KEY,

    collectionUuid: process.env.REACT_APP_COLLECTION_UUID,
    collectionToken: process.env.REACT_APP_COLLECTION_TOKEN,

    searchApiUrl: process.env.REACT_APP_SEARCH_API_URL,

    collectionRoute: process.env.REACT_APP_COLLECTION_EP,
    itemRoute: process.env.REACT_APP_ITEM_EP,
    imageRoute: process.env.REACT_APP_IMAGE_EP
}

export { Config }