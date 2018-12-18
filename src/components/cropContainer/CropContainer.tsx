import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CropperView } from './cropperView/cropperView'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { connect } from 'react-redux'
import { CropPhoto } from '../../actions/actions'

export interface Props {
    photoUri: string
}

class CropContainer extends React.Component<{ photoUri: string, croppedPhotoUri: string, croppedPhotoBlob: undefined, dispatch: Function }> {

    cropper: Cropper
    photoUri: string

    constructor(props) {
        super(props)
        this.cropPhoto = this.cropPhoto.bind(this)
        this.initializeCropper = this.initializeCropper.bind(this)
    }

    async cropPhoto() {
        let croppedPhotoUri = this.cropper.getCroppedCanvas().toDataURL()
        let canvas = this.cropper.getCroppedCanvas()

        console.log(canvas.height, canvas.width)

        let croppedPhotoBlob = await new Promise(resolve => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, 'image/jpeg')
        })

        this.props.dispatch(CropPhoto({croppedPhotoUri, croppedPhotoBlob}))
    }

    initializeCropper(photoElement: HTMLImageElement) {
        this.cropper = new Cropper(photoElement)
    }

    public render() {

        if (this.props.croppedPhotoUri && this.props.croppedPhotoBlob) {
            return (
                <Redirect to={{
                    pathname: '/search-image',
                }}
                >
                </Redirect>
            )
        }

        return (
            <CropperView
                photoUri={this.props.photoUri}
                initializeCropper={this.initializeCropper}
                cropper={this.cropper}
                cropPhoto={this.cropPhoto}>
            </CropperView>
        )

    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer)