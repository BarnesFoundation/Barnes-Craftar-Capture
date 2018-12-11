import * as React from 'react'
import Camera, { FACING_MODES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { Redirect } from 'react-router-dom'

export interface Props {
    onTakePhoto: any
}

class CameraCapture extends React.Component<Props, object> {

    public render() {

        return (
            <div>
               <input onChange={this.props.onTakePhoto} type="file" name="image" accept="image/*" capture="camcorder"></input>
            </div>
        )

    }

}
export { CameraCapture }