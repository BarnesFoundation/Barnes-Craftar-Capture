import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CropperView } from './cropperView/cropperView'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { connect } from 'react-redux'
import { CropPhoto, ClearCroppedPhotoSet } from '../../actions/actions'

export interface Props {
    photoUri: string
    itemSet: boolean
    croppedPhotoUri: string
    croppedPhotoBlob: Blob
    croppedPhotoSet: boolean
    dispatch: Function
}

class CropContainer extends React.Component<Props> {

    cropper: Cropper

    constructor(props) {
        super(props)
        this.cropPhoto = this.cropPhoto.bind(this)
        this.initializeCropper = this.initializeCropper.bind(this)
    }

    componentWillUnmount = () => {
        this.props.dispatch(ClearCroppedPhotoSet(null))
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

        let croppedPhotoSet = true
        this.props.dispatch(CropPhoto({ croppedPhotoUri, croppedPhotoBlob, croppedPhotoSet }))
    }

    initializeCropper(photoElement: HTMLImageElement) {
        this.cropper = new Cropper(photoElement)
    }

    public render() {

        console.log(this.props)

        if (this.props.croppedPhotoSet && !this.props.itemSet) {
            return (
                <Redirect to={{
                    pathname: '/search-image',
                }}>
                </Redirect>
            )
        }

        if (this.props.croppedPhotoSet && this.props.itemSet) {
            return (
                <Redirect to={{
                    pathname: '/add-image',
                }}>
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