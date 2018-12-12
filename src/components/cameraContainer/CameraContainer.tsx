import * as React from 'react'
import { Redirect, BrowserRouter, Route } from 'react-router-dom'
import { CameraCapture } from '../camera/Camera'
import { PhotoViewer } from '../photoViewer/PhotoViewer'
import { CroppedPhotoViewer } from '../croppedPhotoViewer/croppedPhotoViewer'

import { SearchService } from '../../services/searchService'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

class CameraContainer extends React.Component {

    cropper: Cropper
    searchService: SearchService

    constructor(props) {
        super(props)
        this.getPhotoCrop = this.getPhotoCrop.bind(this)
        this.setPhotoCrop = this.setPhotoCrop.bind(this)
        this.findImageMatch = this.findImageMatch.bind(this)

        this.searchService = new SearchService()
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
    }

    async getPhotoCrop() {
        let croppedPhotoUri = this.cropper.getCroppedCanvas().toDataURL()
        let canvas = this.cropper.getCroppedCanvas()
        console.log(canvas.height, canvas.width)

        let croppedPhotoBlob = await new Promise(resolve => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, 'image/jpeg')
        })
        this.setState({ croppedPhotoUri: croppedPhotoUri, croppedPhotoBlob: croppedPhotoBlob, route: '/croppedphotoviewer/' })
    }

    setPhotoCrop(photo: HTMLImageElement) {
        this.cropper = new Cropper(photo)
    }

    async findImageMatch() {
        try {
            let match = await this.searchService.findImageMatch(this.state.croppedPhotoBlob)
            console.log(match)
        }

        catch (error) {
            console.log(error)
        }   
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
            return <CroppedPhotoViewer photoUri={this.state.croppedPhotoUri} findImageMatch={this.findImageMatch}></CroppedPhotoViewer>
        }

        else { return ('') }
    }



}

export { CameraContainer }