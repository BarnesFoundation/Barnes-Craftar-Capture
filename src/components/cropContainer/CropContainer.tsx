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
        let croppingIsLoading = true
        let croppingIsFinished = false
        this.props.dispatch(new UpdateCroppingStatus({ croppingIsLoading, croppingIsFinished }))


        const croppedPhotoUri = await new Promise<string>((resolve) => { resolve(this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 1)) })
        this.props.dispatch(new SetCroppedPhoto({ croppedPhotoUri }))

        croppingIsLoading = false
        croppingIsFinished = true
        setTimeout(() => { this.props.dispatch(new UpdateCroppingStatus({ croppingIsLoading, croppingIsFinished })) }, 500)
    }

    initializeCropper = (photoElement: HTMLImageElement) => { this.cropper = new Cropper(photoElement, { zoomable: false, background: false, viewMode: 1, }) }

    public render() {

        const { id, capturedPhotoUri, croppingIsLoading, croppingIsFinished } = this.props

        // If the photo was cropped but not id is set, navigate to Image Search component
        if ((croppingIsFinished) && !id) {
            return (
                <Redirect to={{
                    pathname: '/search-image',
                }} />
            )
        }

        // If the photo was cropped and an id is already set, navigate to Add Image component
        if ((croppingIsFinished) && id) {
            return (
                <Redirect to={{
                    pathname: '/add-image',
                }} />
            )
        }

        return (
            <CropperView
                photoUri={capturedPhotoUri}
                initializeCropper={this.initializeCropper}
                cropper={this.cropper}
                cropPhoto={this.cropPhoto}
                croppingIsLoading={croppingIsLoading}
            />
        )

    }
}

const mapStateToProps = (state: any) => {

    const { capturedPhotoUri } = state.cameraState
    const { id } = state.collectionItemState

    return { ...state.cropState, capturedPhotoUri, id }
}

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer)