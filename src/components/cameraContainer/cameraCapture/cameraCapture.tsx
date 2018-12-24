import * as React from 'react'
import Button from '@material-ui/core/Button'

export interface Props {
    onTakePhoto: any,
}

class CameraCapture extends React.Component<Props, object> {

    photoInput

    constructor(props) {
        super(props)

        this.photoInput = React.createRef()
    }

    public render() {
        return (
            <div className="camera-capture">
                <Button variant="contained">Capture Photo
                    <label className="file-container">
                        <input className="photo-input" onChange={this.props.onTakePhoto} type="file" name="photoInput" accept="image/*" capture="camcorder" />
                    </label>
                </Button>
            </div>
        )
    }
}

export { CameraCapture }