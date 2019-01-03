import * as React from 'react'
import { AddImageView } from './addImageView/addImageView'
import { ImageService, CreateResponse } from '../../services/imageService'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddImageRequestSuccess, AddImageRequestError, ResetAddImageRequest } from '../../store/actions/addImageActions'
import Button from '@material-ui/core/Button'
import { ResizeService } from 'src/services/resizeService';

export interface Props {

    dispatch: Function

    // Crop State
    croppedPhotoUri: string,

    // Collection Item State
    id: string,
    uuid: string,

    // Add Image State
    response: CreateResponse,
    success: boolean,
    requestComplete: boolean,
    error: boolean,
    errorMessage: string
}

class AddImageContainer extends React.Component<Props> {

    imageService: ImageService
    resizeService: ResizeService

    constructor(props) {
        super(props)
        this.imageService = new ImageService()
        this.resizeService = new ResizeService()
    }

    componentWillUnmount = () => { this.props.dispatch(new ResetAddImageRequest) }

    addImageToItem = async () => {
        try {

            // Get the resized image blob
            const imageBlob = await this.resizeService.resizeImage(this.props.croppedPhotoUri, 'BLOB', 'REFERENCE_IMAGE') as Blob

            const response = await this.imageService.addImage(imageBlob, this.props.uuid)
            const success = response.success
            const requestComplete = true

            // Update the image request success
            this.props.dispatch(new AddImageRequestSuccess({response, success, requestComplete}))
        }

        catch (e) {
            const error = true
            const errorMessage = JSON.stringify(e)

            // Update the image request error
            this.props.dispatch(new AddImageRequestError({error, errorMessage}))
        }
    }

    public render() {

        const cameraButton = (<Button variant="contained" component={({ innerRef, ...props }) => <Link {...props} to="/camera-capture" />}>Return to Camera</Button>)

        return (
            <div className="add-image-container">
                <AddImageView
                    photoUri={this.props.croppedPhotoUri}
                    itemId={this.props.id}
                    addImageToItem={this.addImageToItem}
                    addImageSuccess={this.props.success}
                    addImageResponse={this.props.response}
                    addImageRequestError={this.props.error}
                    addImageRequestErrorMessage={this.props.errorMessage}
                    addImageRequestComplete={this.props.requestComplete}
                />
                {(this.props.requestComplete) ? cameraButton : null}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {

    const { id, uuid } = state.collectionItemState
    const { croppedPhotoUri } = state.cropState

    return { ...state.addImageState, id, croppedPhotoUri }
}

export const ConnectedAddImageContainer = connect(mapStateToProps)(AddImageContainer)