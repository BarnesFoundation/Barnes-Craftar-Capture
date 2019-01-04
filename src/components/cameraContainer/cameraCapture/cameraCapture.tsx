import * as React from 'react'
import Button from '@material-ui/core/Button'
import { LoadingDialog } from '../../../shared/components/loadingDialog'

export interface Props {
    onTakePhoto: any,
    onClearCurrentItem: any,

    capturedPhotoUri: string,

    id: string,

    photoIsLoading: boolean,
    photoIsLoaded: boolean
}

class CameraCapture extends React.Component<Props, object> {

    photoInput

    constructor(props) {
        super(props)
        this.photoInput = React.createRef()
    }

    public render() {

        const displayText = 'Loading the captured image'

        const { id, photoIsLoading, onClearCurrentItem, onTakePhoto } = this.props

        const setItemText = (<p>Currently capturing photos for Item ID: {id}</p>)
        const noSetItemText = (<p>Capture a photo of an existing item</p>)

        const clearItemButton = (<Button variant="contained" onClick={onClearCurrentItem}>Clear current item</Button>)

        const fileInput = <input onChange={onTakePhoto} type="file" name="photoInput" accept="image/*" capture="camcorder" />

        const cameraButton = (<Button variant="contained" className="fileContainer">Capture Photo {fileInput}</Button>)

        return (

            <div className="camera-container">
                <h2>Search By Image</h2>
                {(id) ? setItemText : noSetItemText}
                {(id) ? clearItemButton : null}
                {cameraButton}
                {(photoIsLoading) ? <LoadingDialog displayText={displayText} dialogOpen={true}/> : null}
            </div>
        )
    }
}

export { CameraCapture }