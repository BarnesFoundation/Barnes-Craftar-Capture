import * as loadImage from 'blueimp-load-image'

const LANDSCAPE = 'LANDSCAPE'
const PORTRAIT = 'PORTRAIT'
const SQUARE = 'SQUARE'

class Dimensions {
    height: number
    width: number

    constructor(height: number, width: number) {
        this.height = height
        this.width = width
    }
}



class ResizeService {

    async resizeImage(sourceImage: string): Promise<string> {

        const image = new Image()
        image.src = sourceImage

        return new Promise<string>((resolve) => {
            image.onload = async () => {

                let orientation = this.determineOrientation(image.height, image.width)
                let d = this.getResizedDimensions(orientation, image.height, image.width)

                const canvas = document.createElement('canvas')
                canvas.height = d.height
                canvas.width = d.width

                const ctx = canvas.getContext('2d')
                ctx.drawImage(image, 0, 0, d.width, d.height)

                let imageUri = ctx.canvas.toDataURL('image/jpeg', 1)
                let imageBlob = await new Promise<Blob>((resolve) => {
                    ctx.canvas.toBlob((blob) => {
                        resolve(blob)
                    }, 'image/jpeg', 1)
                })
                resolve(imageUri)
            }
        })
    }

    async correctImageOrientation(image: string): Promise<string> {
        return new Promise<string>((resolve) => {
            loadImage(image, (canvas) => {
                resolve(canvas.toDataURL('image/jpeg'))
            }, { canvas: true, orientation: orientation })
        })
    }

    private determineOrientation(height: number, width: number): string {

        let orientation

        if (height > width) { orientation = PORTRAIT }
        if (height < width) { orientation = LANDSCAPE }
        if (width == height) { orientation = SQUARE }

        return orientation
    }

    private getResizedDimensions(orientation: string, cHeight: number, cWidth: number): Dimensions {

        let scaleFactor
        let width
        let height

        switch (orientation) {
            case LANDSCAPE:
                width = 640
                scaleFactor = width / cWidth
                height = cHeight * scaleFactor
                break

            case PORTRAIT:
                height = 640
                scaleFactor = height / cHeight
                width = cWidth * scaleFactor
                break

            case SQUARE:
                height = 640
                width = 640
                break

        }
        return new Dimensions(height, width)
    }
}

export { ResizeService }