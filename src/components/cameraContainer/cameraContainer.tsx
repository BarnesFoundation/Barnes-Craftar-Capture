import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetCapturedPhotoAndLoading, ClearCapturedPhoto, UpdatePhotoLoaded, UpdatePhotoCapturedAndLoading } from '../../store/actions/cameraActions'
import { ResetSetCollectionItem } from '../../store/actions/collectionItemActions'
import { ResizeService } from '../../services/resizeService'
import { CameraCapture } from './cameraCapture/cameraCapture'

export interface Props {
    dispatch: Function,

    // Camera State
    capturedPhotoUri: string,
    photoWasCaptured: boolean,
    photoIsLoading: boolean,
    photoFinishedLoading: boolean,

    // Collection Item State
    id: string,
    uuid: string
}

class CameraContainer extends React.Component<Props> {

    resizeService: ResizeService
    photoInput

    setItemWasCleared: boolean = null

    constructor(props) {
        super(props)
        this.resizeService = new ResizeService()
        this.photoInput = React.createRef()
    }

    componentWillUnmount = () => { this.props.dispatch(new ClearCapturedPhoto()) }

    onTakePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const photoWasCaptured = true
        let photoIsLoading = true
        let photoFinishedLoading = false
    
        // Update that photo was captured and is loading
        this.props.dispatch(new UpdatePhotoCapturedAndLoading({ photoWasCaptured, photoIsLoading }))

        // Get the file and convert to correctly oriented uri
        const file = event.target.files[0]
        const capturedPhotoUri = await this.resizeService.correctImageOrientation(URL.createObjectURL(file))

        photoFinishedLoading = true
        photoIsLoading = false

        // Update state with the uri 
        this.props.dispatch(new SetCapturedPhotoAndLoading({ capturedPhotoUri, photoFinishedLoading, photoIsLoading }))
    }

    onClearCurrentItem = (event) => {
        this.setItemWasCleared = true
        this.props.dispatch(new ResetSetCollectionItem())
    }

    public render() {

        const id = this.props.id
        const capturedPhotoUri = this.props.capturedPhotoUri

        const photoWasCaptured = this.props.photoWasCaptured
        const photoIsLoading = this.props.photoIsLoading
        const photoFinishedLoading = this.props.photoFinishedLoading

        // Navigate to crop component once a photo is captured
        if (photoWasCaptured && photoFinishedLoading) {
            console.log('Navigating to crop', photoFinishedLoading)
            return (<Redirect to={{ pathname: '/crop-image' }}></Redirect>)
        }

        // Navigate to root component if the set item is cleared
        if (this.setItemWasCleared) { return (<Redirect to={{ pathname: '/' }}></Redirect>) }

        return (
            <CameraCapture
                onTakePhoto={this.onTakePhoto}
                onClearCurrentItem={this.onClearCurrentItem}
                capturedPhotoUri={capturedPhotoUri}
                photoWasCaptured={photoWasCaptured}
                photoIsLoading={photoIsLoading}
                photoFinishedLoading={photoFinishedLoading}
                id={id}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    ...state.cameraState, ...state.collectionItemState
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)