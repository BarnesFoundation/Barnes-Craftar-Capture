import * as React from 'react'
import { CameraCapture } from './cameraCapture/cameraCapture'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddCapturedPhoto } from '../../actions/actions'

class CameraContainer extends React.Component<{ dispatch: Function, photoUri: string }> {

    constructor(props) {
        super(props)
        this.onTakePhoto = this.onTakePhoto.bind(this)
    }

    getSetItem = (photoUri) => {
        console.log('The photoUri' , photoUri)
    }

    onTakePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        let photoUri = URL.createObjectURL(event.target.files[0]);
        this.props.dispatch(AddCapturedPhoto({ photoUri }))
        
    }

    public render() {
        if (this.props.photoUri) {
            return (
                <Redirect
                    to={{
                        pathname: '/crop-image',
                    }}
                ></Redirect>
            )
        }

        return (
            <CameraCapture
                onTakePhoto={this.onTakePhoto}>
            </CameraCapture>
        )
    }
}


const mapStateToProps = state => ({
    ...state
});

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)