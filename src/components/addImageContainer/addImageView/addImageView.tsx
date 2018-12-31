import * as React from 'react'
import { PhotoView } from '../../photoView/photoView'
import { CreateResponse } from '../../../services/imageService'
import Button from '@material-ui/core/Button'

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

    constructor(props) { super(props) }

    addImageToItem = (event) => { this.props.addImageToItem() }

    public render() {

        const photoView = (<PhotoView photoUri={this.props.photoUri}></PhotoView>)

        const addImageButton = (<div className="button-container"><Button variant="contained" onClick={this.addImageToItem}>Add Image to Item</Button></div>)

        const successSection = (<p>Successfully added the image to item {this.props.itemId}</p>)

        const failSection = (<p>Failed to add the image to item {this.props.itemId}</p>)

        const errorSection = (
            <div>
                <p>The error that occurred:</p>
                <p>{this.props.addImageRequestErrorMessage}</p>
            </div>
        )

        return (
            <>
                {photoView}
                {(this.props.addImageRequestComplete) ? null : addImageButton}
                {(this.props.addImageRequestComplete && this.props.addImageSuccess) ? successSection : null}
                {(this.props.addImageRequestComplete && !this.props.addImageSuccess) ? failSection : null}
                {(this.props.addImageRequestError) ? errorSection : null}
            </>
        )
    }

}

export { AddImageView }