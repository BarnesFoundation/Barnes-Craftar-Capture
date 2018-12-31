import * as React from 'react'
import { AddImageView } from './addImageView/addImageView'
import { ImageService, CreateResponse } from '../../services/imageService'
import { AddImageToItem, AddImageRequestError, AddImageRequestComplete, ClearAddImageData } from '../../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ResizeService } from 'src/services/resizeService';

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

    imageService: ImageService
    resizeService: ResizeService

    constructor(props) {
        super(props)
        this.addImageToItem = this.addImageToItem.bind(this)
        this.imageService = new ImageService()
        this.resizeService = new ResizeService()
    }

    componentWillUnmount = () => {
        this.props.dispatch(ClearAddImageData(null))
    }

    async addImageToItem() {
        try {
            let image = await this.resizeService.resizeImage(this.props.croppedPhotoUri, 'BLOB', 'REFERENCE_IMAGE') as Blob

            let addImageResponse = await this.imageService.addImage(image, this.props.itemUuid)
            let addImageSuccess = addImageResponse.success

            this.props.dispatch(AddImageToItem({ addImageResponse, addImageSuccess }))
        }

        catch (error) {
            let addImageRequestError = true
            let addImageRequestErrorMessage = JSON.stringify(error)
            let addImageSuccess = false

            this.props.dispatch(AddImageRequestError({ addImageRequestError, addImageRequestErrorMessage, addImageSuccess }))
        }

        let addImageRequestComplete = true
        this.props.dispatch(AddImageRequestComplete({ addImageRequestComplete }))
    }

    public render() {

        const cameraButton = (<Button variant="contained" component={({ innerRef, ...props }) => <Link {...props} to="/camera-capture" />}>Return to Camera</Button>)

        return (
            <div className="add-image-container">
                <AddImageView
                    photoUri={this.props.croppedPhotoUri}
                    itemId={this.props.itemId}
                    addImageToItem={this.addImageToItem}
                    addImageSuccess={this.props.addImageSuccess}
                    addImageResponse={this.props.addImageResponse}
                    addImageRequestError={this.props.addImageRequestError}
                    addImageRequestErrorMessage={this.props.addImageRequestErrorMessage}
                    addImageRequestComplete={this.props.addImageRequestComplete}
                />
                {(this.props.addImageRequestComplete) ? cameraButton : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedAddImageContainer = connect(mapStateToProps)(AddImageContainer)