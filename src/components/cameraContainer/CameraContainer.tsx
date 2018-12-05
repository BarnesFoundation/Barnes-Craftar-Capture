import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CameraCapture } from '../camera/Camera'
import { PhotoViewer } from '../photoViewer/PhotoViewer'

class CameraContainer extends React.Component {

    state = {
        photoUriSet: false,
        photoUri: ''
    }

    onTakePhoto = (dataUri: string) => {
        this.setState({ photoUri: dataUri, photoUriSet: true })
    }

    public render() {

        if (!this.state.photoUriSet) {
            return (
                <CameraCapture onTakePhoto={this.onTakePhoto}></CameraCapture>
            )
        }

        else {
            return (
                <PhotoViewer photoUri={this.state.photoUri}></PhotoViewer>
            )
        }
    }
}

export { CameraContainer }