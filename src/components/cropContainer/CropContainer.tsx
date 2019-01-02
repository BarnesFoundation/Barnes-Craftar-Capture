import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CropperView } from './cropperView/cropperView'
import { LoadingDialog } from '../../shared/components/loadingDialog'

import { connect } from 'react-redux'
import { CropPhoto, ClearCroppedPhotoSet } from '../../store/actions/actions'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

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
    state = { croppingInProgress: false }
    

    constructor(props) {
        super(props)
        this.cropPhoto = this.cropPhoto.bind(this)
    }

    componentWillUnmount = () => {
        this.props.dispatch(ClearCroppedPhotoSet(null))
    }

    async cropPhoto() {
        console.log('Cropping...')
        this.setState({ croppingInProgress : true })
        let canvas = this.cropper.getCroppedCanvas()

        let croppedPhotoBlob = await new Promise(resolve => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, 'image/jpeg')
        })
        let croppedPhotoUri = canvas.toDataURL()

        let croppedPhotoSet = true
        
        this.setState({ croppingInProgress : false })
        console.log('Cropping done')
        this.props.dispatch(CropPhoto({ croppedPhotoUri, croppedPhotoBlob, croppedPhotoSet }))
        console.log('Dispatch done')
    }

    initializeCropper = (photoElement: HTMLImageElement) => {
        this.cropper = new Cropper(photoElement, { background: false })
    }

    public render() {

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
            <>
            <CropperView
                photoUri={this.props.photoUri}
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
    ...state
})

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer)