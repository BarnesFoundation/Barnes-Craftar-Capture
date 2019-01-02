import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CropperView } from './cropperView/cropperView'
import { LoadingDialog } from '../../shared/components/loadingDialog'

import { connect } from 'react-redux'
import { SetCroppedPhoto, ResetCroppedPhoto } from '../../store/actions/cropActions'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export interface Props {
    dispatch: Function,

    // Crop State
    croppedPhotoUri: string,
    photoWasCropped: boolean,

    // Camera State
    capturedPhotoUri: string,

    // Collection Item State
    id: string
}

class CropContainer extends React.Component<Props> {

    cropper: Cropper
    state = { croppingInProgress: false }

    constructor(props) {
        super(props)
    }

    componentWillUnmount = () => { this.props.dispatch(new ResetCroppedPhoto()) }

    cropPhoto = async () => {
        /* console.log('Cropping...')
        this.setState({ croppingInProgress : true }) */

        const croppedPhotoUri = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 1)
        const photoWasCropped = true

        this.props.dispatch(new SetCroppedPhoto({ croppedPhotoUri, photoWasCropped }))

        /* this.setState({ croppingInProgress : false })
        console.log('Cropping done') */
    }

    initializeCropper = (photoElement: HTMLImageElement) => { this.cropper = new Cropper(photoElement, { background: false }) }

    public render() {

        const { photoWasCropped, id, capturedPhotoUri } = this.props

        // If the photo was cropped but not id is set, navigate to Image Search component
        if (photoWasCropped && !id) {
            return (
                <Redirect to={{
                    pathname: '/search-image',
                }}>
                </Redirect>
            )
        }

        // If the photo was cropped and an id is already set, navigate to Add Image component
        if (photoWasCropped && id) {
            return (
                <Redirect to={{
                    pathname: '/add-image',
                }}>
                </Redirect>
            )
        }

        return (
            <>
                <CropperView
                    photoUri={capturedPhotoUri}
                    initializeCropper={this.initializeCropper}
                    cropper={this.cropper}
                    cropPhoto={this.cropPhoto}>
                </CropperView>
                {(this.state.croppingInProgress) ? <LoadingDialog></LoadingDialog> : null}
            </>
        )

    }
}

const mapStateToProps = state => ({
    ...state.cropState, ...state.cameraState, ...state.collectionItemState
})

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer)