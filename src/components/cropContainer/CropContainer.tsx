import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CropperView } from './cropperView/cropperView'

import { connect } from 'react-redux'
import { SetCroppedPhoto, ResetCroppedPhoto, UpdateCroppingStatus } from '../../store/actions/cropActions'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export interface Props {
    dispatch: Function,

    // Crop State
    croppedPhotoUri: string,
    photoWasCropped: boolean,
    croppingIsLoading: boolean,
    croppingIsFinished: boolean,

    // Camera State
    capturedPhotoUri: string,

    // Collection Item State
    id: string
}

class CropContainer extends React.Component<Props> {

    cropper: Cropper

    constructor(props) {
        super(props)
    }

    componentWillUnmount = () => { this.props.dispatch(new ResetCroppedPhoto()) }

    cropPhoto = async () => {
        const photoWasCropped = true
        let croppingIsLoading = true
        let croppingIsFinished = false

        this.props.dispatch(new UpdateCroppingStatus({ croppingIsLoading, croppingIsFinished }))

        const croppedPhotoUri = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 1)
        this.props.dispatch(new SetCroppedPhoto({ croppedPhotoUri, photoWasCropped }))

        croppingIsLoading = false
        croppingIsFinished = true
        this.props.dispatch(new UpdateCroppingStatus({ croppingIsLoading, croppingIsFinished }))
    }

    initializeCropper = (photoElement: HTMLImageElement) => { this.cropper = new Cropper(photoElement, { background: false }) }

    public render() {

        const { photoWasCropped, id, capturedPhotoUri, croppingIsLoading, croppingIsFinished } = this.props

        // If the photo was cropped but not id is set, navigate to Image Search component
        if ((photoWasCropped && croppingIsFinished) && !id) {
            return (
                <Redirect to={{
                    pathname: '/search-image',
                }} />
            )
        }

        // If the photo was cropped and an id is already set, navigate to Add Image component
        if ((photoWasCropped && croppingIsFinished) && id) {
            return (
                <Redirect to={{
                    pathname: '/add-image',
                }} />
            )
        }

        return (
            <CropperView
                photoWasCropped={this.props.photoWasCropped}
                photoUri={this.props.capturedPhotoUri}
                initializeCropper={this.initializeCropper}
                cropper={this.cropper}
                cropPhoto={this.cropPhoto}
                croppingIsLoading={this.props.croppingIsLoading}
                croppingIsFinished={this.props.croppingIsFinished}>
            </CropperView>
        )

    }
}

const mapStateToProps = (state: any) => ({
    ...state.cropState, ...state.cameraState, ...state.collectionItemState
})

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer)