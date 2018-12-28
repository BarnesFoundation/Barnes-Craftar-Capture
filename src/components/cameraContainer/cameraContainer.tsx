import * as React from 'react'
import { CameraCapture } from './cameraCapture/cameraCapture'
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

    constructor(props) {
        super(props)
        this.resizeService = new ResizeService()
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
        this.props.dispatch(ClearSetItem(null))
    }



    public render() {

        const itemSection = (<p>Capturing photos for Item: {this.props.itemId}</p>)
        const clearItemButton = (<Button variant="contained" onClick={this.onClearCurrentItem}>Clear current item</Button>)

        if (this.props.photoCaptured) {
            return (
                <Redirect to={{ pathname: '/crop-image' }}></Redirect>
            )
        }

        return (
            <>
                {(this.props.itemSet) ? itemSection : null}
                {(this.props.itemSet) ? clearItemButton : null}
                <CameraCapture
                    onTakePhoto={this.onTakePhoto}>
                </CameraCapture>
            </>
        )
    }
}


const mapStateToProps = state => ({
    ...state
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)