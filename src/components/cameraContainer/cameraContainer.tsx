import * as React from 'react'
import { CameraCapture } from './cameraCapture/cameraCapture'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddCapturedPhoto } from '../../actions/actions'

export interface Props {
    dispatch: Function,
    photoUri: string,

    itemId: string,
    itemSet: boolean,
}

class CameraContainer extends React.Component<Props> {

    constructor(props) {
        super(props)
    }

    onTakePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        let photoUri = URL.createObjectURL(event.target.files[0]);
        this.props.dispatch(AddCapturedPhoto({ photoUri }))
    }

    public render() {

        let itemSection

        if (this.props.itemSet) {
            itemSection = (
                <p>Capturing photos for Item: {this.props.itemId}</p>
            )
        }

        if (this.props.photoUri) {
            return (
                <Redirect to={{ pathname: '/crop-image' }}></Redirect>
            )
        }

        return (
            <div>
                {itemSection}
                <CameraCapture
                    onTakePhoto={this.onTakePhoto}>
                </CameraCapture>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)