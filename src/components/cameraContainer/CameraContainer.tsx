import * as React from 'react'
import { Redirect, BrowserRouter, Route } from 'react-router-dom'
import { CameraCapture } from '../camera/Camera'
import { PhotoViewer } from '../photoViewer/PhotoViewer'
import { CroppedPhotoViewer } from '../croppedPhotoViewer/croppedPhotoViewer'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

class CameraContainer extends React.Component {

    cropper: Cropper

    constructor(props) {
        super(props)
        this.getPhotoCrop = this.getPhotoCrop.bind(this)
        this.setPhotoCrop = this.setPhotoCrop.bind(this)
    }

    state = {
        route: '/camera/',
        photoUri: null,
        croppedPhotoUri: null,
        croppedPhotoBlob: null,
    }

    onTakePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        let fileUri = URL.createObjectURL(event.target.files[0]);
        this.setState({ photoUri: fileUri, photoUriSet: true, route: '/photoviewer/' })
        console.log('The route is' + this.state.route)
    }

    async getPhotoCrop() {
        let croppedPhotoUri = this.cropper.getCroppedCanvas().toDataURL()
        let croppedPhotoBlob = await new Promise(resolve => {
            this.cropper.getCroppedCanvas().toBlob((blob) => {
                resolve(blob)
            })
        })

        this.setState({ croppedPhotoUri: croppedPhotoUri, croppedPhotoBlob: croppedPhotoBlob, route: '/croppedphotoviewer/' })
    }

    setPhotoCrop(photo: HTMLImageElement) {
        this.cropper = new Cropper(photo)
    }

    public render() {

        let show = this.state.route

        if (show === '/camera/') {
            return (<CameraCapture onTakePhoto={this.onTakePhoto}></CameraCapture>)
        }

        if (show === '/photoviewer/') {
            return (<PhotoViewer photoUri={this.state.photoUri} getPhotoCrop={this.getPhotoCrop} cropper={this.cropper} setPhotoCrop={this.setPhotoCrop}></PhotoViewer>)
        }

        if (show === '/croppedphotoviewer/') {
            return <CroppedPhotoViewer photoUri={this.state.croppedPhotoUri} photoBlob={this.state.croppedPhotoBlob}></CroppedPhotoViewer>
        }

        else { return ('') }
    }



}

export { CameraContainer }