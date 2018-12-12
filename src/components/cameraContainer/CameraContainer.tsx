import * as React from 'react'
import { Redirect, BrowserRouter, Route } from 'react-router-dom'
import { CameraCapture } from '../camera/Camera'
import { PhotoViewer } from '../photoViewer/PhotoViewer'
import { CroppedPhotoViewer } from '../croppedPhotoViewer/croppedPhotoViewer'

import { SearchService, MatchResponse } from '../../services/searchService'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

class CameraContainer extends React.Component {

    cropper: Cropper
    searchService: SearchService

    imageMatchSuccess: boolean = null
    imageMatchResponse: MatchResponse = null

    requestError: boolean = null
    requestErrorMessage: any = null

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
        requestComplete: false
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
            this.imageMatchResponse = await this.searchService.findImageMatch(this.state.croppedPhotoBlob)
            this.imageMatchSuccess = this.imageMatchResponse.success
        }

        catch (error) {
            this.requestErrorMessage = error
            this.requestError = true
            this.imageMatchSuccess = false
        }

        this.setState({ requestComplete: true })
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
            return <CroppedPhotoViewer
                photoUri={this.state.croppedPhotoUri}
                findImageMatch={this.findImageMatch}
                imageMatchSuccess={this.imageMatchSuccess}
                imageMatchResponse={this.imageMatchResponse}
                requestError={this.requestError}
                requestErrorMessage={this.requestErrorMessage}
                requestComplete={this.state.requestComplete}>
            </CroppedPhotoViewer>
        }

        else { return ('') }
    }



}

export { CameraContainer }