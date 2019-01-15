import * as React from 'react'
import Button from '@material-ui/core/Button'
import { LoadingDialog } from '../../../shared/components/loadingDialog'
import { Link } from 'react-router-dom'

export interface Props {
    onTakePhoto: any,
    onClearCurrentItem: any,

    capturedPhotoUri: string,

    id: string,
    itemImageUrl: string,

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

        const { id, photoIsLoading, onClearCurrentItem, onTakePhoto, itemImageUrl } = this.props

        const setItemText = (<p>Capturing reference images for Item ID: {id}</p>)
        const noSetItemText = (<p>Capture a photo of an existing item</p>)
        const itemImage = (<img src={itemImageUrl} ></img>)

        const clearItemButton = (<Button variant="contained" onClick={onClearCurrentItem}>Clear current item</Button>)

        const fileInput = <input onChange={onTakePhoto} type="file" name="photoInput" accept="image/*" capture="camcorder" />

        const cameraButton = (<Button variant="contained" className="fileContainer">Capture Photo {fileInput}</Button>)
        const homeButton = (<Button variant="contained" component={({ innerRef, ...props }) => <Link {...props} to="/" />}>Home</Button>)

        return (

            <div className="camera-container">
                <h2>Camera Capture</h2>
                <div className="image-box">
                    {(id) ? setItemText : noSetItemText}
                    {(itemImageUrl) ? itemImage : null}
                </div>
                {cameraButton}
                <div className="bottom-buttons">
                    {(id) ? clearItemButton : null}
                    {homeButton}
                </div>
                {(photoIsLoading) ? <LoadingDialog displayText={displayText} dialogOpen={true} /> : null}
            </div>
        )
    }
}

export { CameraCapture }