import * as React from 'react'
import { CameraCapture } from './cameraCapture/cameraCapture'
import { Redirect, RouteProps } from 'react-router-dom'


class CameraContainer extends React.Component<RouteProps, object> {

    itemId: string
    itemUuid: string

    constructor(props) {
        super(props)
        this.onTakePhoto = this.onTakePhoto.bind(this)

        if (this.props.location.state) {
            this.itemId = this.props.location.state.id
            this.itemUuid = this.props.location.state.uuid
        }
    }

    state = {
        photoUri: null,
    }

    onTakePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        let photoUri = URL.createObjectURL(event.target.files[0]);
        this.setState({ photoUri: photoUri })
    }

    public render() {

        let itemSection = null

        if (this.itemId && this.itemUuid) {
            itemSection = (
                <p>Now capturing images for Item Id: {this.itemId}</p>
            )
        }

        if (this.state.photoUri) {
            return (
                <Redirect
                    to={{
                        pathname: '/crop-image',
                        state: { photoUri: this.state.photoUri }
                    }}
                ></Redirect>
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

export { CameraContainer }