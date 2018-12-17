import * as React from 'react'
import { AddImageView } from './addImageView/addImageView'
import { ImageService, CreateResponse } from '../../services/imageService'

class AddImageContainer extends React.Component {

    itemId: string = null
    itemUuid: string = null

    addImageSuccess: boolean = null
    addImageResponse: CreateResponse = null

    addImageRequestError: boolean = null
    addImageRequestErrorMessage: any = null

    ImageService: ImageService

    constructor(props) {
        super(props)
        this.addImageToItem = this.addImageToItem.bind(this)
        this.ImageService = new ImageService()
    }

    state = {
        photoBlob: null,
        photoUri: null,
        addImageRequestComplete: null,
    }

    async addImageToItem() {
        try {
            this.addImageResponse = await this.ImageService.addImage(this.state.photoBlob, this.itemUuid)
            this.addImageSuccess = this.addImageResponse.success
        }

        catch (error) {
            this.addImageRequestError = true
            this.addImageRequestErrorMessage = error
            this.addImageSuccess = false
        }
        this.setState({ addImageRequestComplete: true })
    }



    public render() {
        return (
            <AddImageView
                photoUri={this.state.photoUri}
                itemId={this.itemId}
                addImageToItem={this.addImageToItem}
                addImageSuccess={this.addImageSuccess}
                addImageResponse={this.addImageResponse}
                addImageRequestError={this.addImageRequestError}
                addImageRequestErrorMessage={this.addImageRequestErrorMessage}
                addImageRequestComplete={this.state.addImageRequestComplete}
            ></AddImageView>
        )
    }
}

export { AddImageContainer }