interface CatchoomResponse {
    results: Result[],
    search_time: number
}

interface Item {
    uuid: string,
    name: string,
    url: string,
    custom: any
}

interface Image {
    uuid: string,
    thumb_120: string
}

interface Result {
    item?: Item,
    image?: Image,
    score?: number,
}

export { CatchoomResponse }