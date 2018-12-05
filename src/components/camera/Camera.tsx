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
            <div className="camera">
                <Camera 
                idealFacingMode={FACING_MODES.USER} 
                idealResolution={{height: 1080, width: 1920}}
                sizeFactor={1} 
                onTakePhoto={(dataUri: string) => { this.props.onTakePhoto(dataUri) }}></Camera>
            </div>
        )
    }
}

export { CameraCapture }