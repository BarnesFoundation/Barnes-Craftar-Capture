import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CropperView } from './cropperView/cropperView'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { RouteProps } from 'react-router-dom';

export interface Props {
    photoUri: string
}

class CropContainer extends React.Component<Props & RouteProps, object> {

    cropper: Cropper
    photoUri: string

    constructor(props) {
        super(props)
        this.cropPhoto = this.cropPhoto.bind(this)
        this.initializeCropper = this.initializeCropper.bind(this)

        this.photoUri = this.props.location.state.photoUri
    }

    state = {
        croppedPhotoUri: null,
        croppedPhotoBlob: null,
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
        this.setState({ croppedPhotoUri: croppedPhotoUri, croppedPhotoBlob: croppedPhotoBlob })
    }

    initializeCropper(photoElement: HTMLImageElement) {
        this.cropper = new Cropper(photoElement)
    }

    public render() {

        if (this.state.croppedPhotoUri && this.state.croppedPhotoBlob) {
            return (
                <Redirect to={{
                    pathname: '/search-image',
                    state: { photoUri: this.state.croppedPhotoUri, photoBlob: this.state.croppedPhotoBlob }
                }}
                >
                </Redirect>
            )
        }

        return (
            <CropperView
                photoUri={this.photoUri}
                initializeCropper={this.initializeCropper}
                cropper={this.cropper}
                cropPhoto={this.cropPhoto}>
            </CropperView>
        )

    }
}

export { CropContainer }