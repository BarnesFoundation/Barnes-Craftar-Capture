import * as React from 'react'
import Button from '@material-ui/core/Button'

export interface Props {
    onTakePhoto: any,
    onClearCurrentItem: any,

    capturedPhotoUri: string,
    photoWasCaptured: boolean,

    id: string,
    uuid: string
}

class CameraCapture extends React.Component<Props, object> {

    photoInput

    constructor(props) {
        super(props)

        this.photoInput = React.createRef()
    }

    public render() {

        const id = this.props.id

        const setItemText = (<p>Currently capturing photos for item ID: {id}</p>)
        const noSetItemText = (<p>Capture a photo of an existing item</p>)

        const clearItemButton = (<Button variant="contained" onClick={this.props.onClearCurrentItem}>Clear current item</Button>)

        const fileInput = <input onChange={this.props.onTakePhoto} type="file" name="photoInput" accept="image/*" capture="camcorder" />
        const cameraButton = (<Button variant="contained" className="fileContainer">Capture Photo {fileInput}</Button>)

        return (
            <div className="camera-container">
                {(id) ? setItemText : noSetItemText}
                {(id) ? clearItemButton : null}
                {cameraButton}
            </div>
        )
    }
}

export { CameraCapture }