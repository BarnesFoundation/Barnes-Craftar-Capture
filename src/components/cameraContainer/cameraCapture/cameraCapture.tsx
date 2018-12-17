import * as React from 'react'

export interface Props {
    onTakePhoto: any,
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