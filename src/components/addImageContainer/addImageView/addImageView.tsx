import * as React from 'react'
import { PhotoView } from '../../photoView/photoView'
import { CreateResponse } from '../../../services/imageService'

interface Props {
    photoUri: string
    itemId: string
    addImageToItem: Function

    addImageSuccess: boolean
    addImageResponse: CreateResponse

    addImageRequestError: boolean
    addImageRequestErrorMessage: any

    addImageRequestComplete: boolean
}

class AddImageView extends React.Component<Props, object> {

    constructor(props) {
        super(props)
        this.addImageToItem = this.addImageToItem.bind(this)
    }

    addImageToItem(event) {
        this.props.addImageToItem()
    }

    public render() {

        let photoView = (
            <PhotoView photoUri={this.props.photoUri}></PhotoView>
        )

        let addImageButton = (
            <button onClick={this.addImageToItem}>Add Image to Item</button>
        )

        let successSection = (
            <p>The image was successfully added to item {this.props.itemId}</p>
        )

        let failSection = (
            <p>The image was unable to be added to item {this.props.itemId}</p>
        )

        let errorSection = (
            <div>
                <p>An error occurred adding that image to item: {this.props.itemId}</p>
                <p>{this.props.addImageRequestErrorMessage}</p>
            </div>
        )

        return (
            <div>
                {photoView}
                {(this.props.addImageRequestComplete) ? null : addImageButton}
                {(this.props.addImageRequestComplete && this.props.addImageSuccess) ? successSection : null}
                {(this.props.addImageRequestComplete && !this.props.addImageSuccess) ? failSection : null}
                {(this.props.addImageRequestError) ? errorSection : null}
            </div>
        )
    }

}

export { AddImageView }