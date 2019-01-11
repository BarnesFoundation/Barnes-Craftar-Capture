/** Catchoom Management API Responses */

export interface ImageCreateResponse {
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

export interface ItemCreateResponse {
    collection: string,
    content: any,
    name: string,
    resource_uri: string,
    url: string,
    uuid: string
}

export interface ItemSearchResponse {
    collection: string,
    content: any,
    custom: any,
    name: string,
    resource_uri: string,
    tags: any[],
    url: string,
    uuid: string
}

// export { ImageCreateResponse, ItemCreateResponse, ItemSearchResponse }