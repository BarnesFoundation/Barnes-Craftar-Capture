import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddCapturedPhoto, ClearSetItem, ClearCapturedPhoto } from '../../actions/actions'
import { ResizeService } from '../../services/resizeService'
import Button from '@material-ui/core/Button'

export interface Props {
    dispatch: Function,
    photoUri: string,
    photoCaptured: boolean,

    itemId: string,
    itemSet: boolean,
}

class CameraContainer extends React.Component<Props> {

    resizeService: ResizeService
    photoInput
    itemCleared: boolean = false

    constructor(props) {
        super(props)
        this.resizeService = new ResizeService()
        this.photoInput = React.createRef()
    }

    componentWillUnmount = () => {
        this.props.dispatch(ClearCapturedPhoto(null))
    }

    onTakePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files[0]
        let fileUri = await this.resizeService.correctImageOrientation(URL.createObjectURL(file))

        let photoUri = await this.resizeService.resizeImage(fileUri)
        let photoCaptured = true

        this.props.dispatch(AddCapturedPhoto({ photoUri, photoCaptured }))
    }

    onClearCurrentItem = (event) => {
        this.itemCleared = true
        this.props.dispatch(ClearSetItem(null))
    }

    public render() {

        const setItemText = (<p>Currently capturing photos for item ID: {this.props.itemId}</p>)
        const noSetItemText = (<p>Capture a photo of an existing item</p>)

        const clearItemButton = (<Button variant="contained" onClick={this.onClearCurrentItem}>Clear current item</Button>)

        const cameraButton = (<Button variant="contained" className="fileContainer">
            Capture Photo
        <input onChange={this.onTakePhoto} type="file" name="photoInput" accept="image/*" capture="camcorder" />
        </Button>)

        if (this.props.photoCaptured) {
            return (<Redirect to={{ pathname: '/crop-image' }}></Redirect>)
        }

        if (this.itemCleared) {
            return (<Redirect to={{ pathname: '/' }}></Redirect>)
        }

        return (
            <div className="camera-container">
                {(this.props.itemSet) ? clearItemButton : null}
                {(this.props.itemSet) ? setItemText : noSetItemText}
                {cameraButton}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)