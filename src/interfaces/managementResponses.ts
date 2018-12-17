/** Catchoom Management API Responses */

interface ImageCreateResponse {
    file: string,
    item: string,
    name: string,
    quality: number,
    resource_uri: string,
    status: string,
    thumb_60: string,
    thumb_120: string,
    tracking_dat_status: string,
    uuid: string
}

interface ItemCreateResponse {
    collection: string,
    content: any,
    name: string,
    resource_uri: string,
    url: string,
    uuid: string
}

export { ImageCreateResponse, ItemCreateResponse }