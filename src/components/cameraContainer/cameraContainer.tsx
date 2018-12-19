import * as React from 'react'
import { CameraCapture } from './cameraCapture/cameraCapture'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddCapturedPhoto, ClearSetItem, ClearCapturedPhoto } from '../../actions/actions'

export interface Props {
    dispatch: Function,
    photoUri: string,
    photoCaptured: boolean,

    itemId: string,
    itemSet: boolean,
}

class CameraContainer extends React.Component<Props> {

    constructor(props) {
        super(props)
    }
    
    componentWillUnmount = () => {
        this.props.dispatch(ClearCapturedPhoto(null))
    }

    onTakePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        let photoUri = URL.createObjectURL(event.target.files[0])
        let photoCaptured = true
        this.props.dispatch(AddCapturedPhoto({ photoUri, photoCaptured }))
    }

    onClearCurrentItem = (event) => {
        this.props.dispatch(ClearSetItem(null))
    }

    

    public render() {

        const itemSection = ( <p>Capturing photos for Item: {this.props.itemId}</p> )
        const clearItemButton = ( <button onClick={this.onClearCurrentItem}>Clear current item</button> )

        
        if (this.props.photoUri && this.props.photoCaptured) {
            return (
                <Redirect to={{ pathname: '/crop-image' }}></Redirect>
            )
        }

        return (
            <div>
                { (this.props.itemSet) ? itemSection : null }
                { (this.props.itemSet) ? clearItemButton : null }
                <CameraCapture
                    onTakePhoto={this.onTakePhoto}>
                </CameraCapture>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)