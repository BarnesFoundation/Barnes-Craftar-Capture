import * as React from 'react'
import { AddImageView } from './addImageView/addImageView'
import { ImageService, CreateResponse } from '../../services/imageService'
import { AddImageToItem, AddImageRequestError, AddImageRequestComplete } from '../../actions/actions'
import { connect } from 'react-redux'

export interface Props {
    dispatch: Function
    croppedPhotoUri: string,
    croppedPhotoBlob: Blob

    itemId: string,
    itemUuid: string,

    addImageResponse: CreateResponse,    
    addImageSuccess: boolean,
    addImageRequestComplete: boolean,
    addImageRequestError: boolean,
    addImageRequestErrorMessage: string
}

class AddImageContainer extends React.Component<Props> {

    ImageService: ImageService

    constructor(props) {
        super(props)
        this.addImageToItem = this.addImageToItem.bind(this)
        this.ImageService = new ImageService()
    }

    async addImageToItem() {
        try {
            let addImageResponse = await this.ImageService.addImage(this.props.croppedPhotoBlob, this.props.itemUuid)
            let addImageSuccess = addImageResponse.success

            this.props.dispatch(AddImageToItem({ addImageResponse, addImageSuccess }))
        }

        catch (error) {
            let addImageRequestError = true
            let addImageRequestErrorMessage = error
            let addImageSuccess = false

            this.props.dispatch(AddImageRequestError({ addImageRequestError, addImageRequestErrorMessage, addImageSuccess }))
        }

        let addImageRequestComplete = true
        this.props.dispatch(AddImageRequestComplete({ addImageRequestComplete }))
    }

    public render() {

        console.log('The props' , this.props)
        return (
            <AddImageView
                photoUri={this.props.croppedPhotoUri}
                itemId={this.props.itemId}
                addImageToItem={this.addImageToItem}
                addImageSuccess={this.props.addImageSuccess}
                addImageResponse={this.props.addImageResponse}
                addImageRequestError={this.props.addImageRequestError}
                addImageRequestErrorMessage={this.props.addImageRequestErrorMessage}
                addImageRequestComplete={this.props.addImageRequestComplete}
            ></AddImageView>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedAddImageContainer = connect(mapStateToProps)(AddImageContainer)