const REACT_APP_COLLECTION_EP = "collection";
const REACT_APP_ITEM_EP = "item";
const REACT_APP_IMAGE_EP = "image";

const REACT_APP_MANAGEMENT_API_URL = "https://my.craftar.net/api/v0/";
const REACT_APP_SEARCH_API_URL = "https://search.craftar.net/v1/search";

const Config = {
  /** Craftar environment variables */
  searchApiUrl: REACT_APP_SEARCH_API_URL,
  managementApiUrl: REACT_APP_MANAGEMENT_API_URL,
  managementApiKey: process.env.REACT_APP_MANAGEMENT_API_KEY,

  collectionUuid: process.env.REACT_APP_COLLECTION_UUID,
  collectionToken: process.env.REACT_APP_COLLECTION_TOKEN,

  collectionRoute: REACT_APP_COLLECTION_EP,
  itemRoute: REACT_APP_ITEM_EP,
  imageRoute: REACT_APP_IMAGE_EP,
};

export { Config };
