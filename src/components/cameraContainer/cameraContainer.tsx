import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetCapturedPhoto, ClearCapturedPhoto } from '../../store/actions/cameraActions'
import { ResetSetCollectionItem } from '../../store/actions/collectionItemActions'
import { ResizeService } from '../../services/resizeService'
import { CameraCapture } from './cameraCapture/cameraCapture'

export interface Props {
    dispatch: Function,

    // Camera State
    capturedPhotoUri: string,
    photoWasCaptured: boolean

    // Collection Item State
    id: string,
    uuid: string
}

class CameraContainer extends React.Component<Props> {

    resizeService: ResizeService
    photoInput
    setCollectionItemWasCleared: boolean = false

    constructor(props) {
        super(props)
        this.resizeService = new ResizeService()
        this.photoInput = React.createRef()

        console.log(this.props.id, this.props.uuid)
    }

    componentWillUnmount = () => { this.props.dispatch(new ClearCapturedPhoto()) }

    onTakePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {

        // Get the file and convert to correctly oriented uri
        let file = event.target.files[0]
        let capturedPhotoUri = await this.resizeService.correctImageOrientation(URL.createObjectURL(file))
        let photoWasCaptured = true

        // Update state with the uri 
        this.props.dispatch(new SetCapturedPhoto({ capturedPhotoUri, photoWasCaptured }))
    }

    onClearCurrentItem = (event) => {
        this.setCollectionItemWasCleared = true
        this.props.dispatch(new ResetSetCollectionItem())
    }

    public render() {

        const photoWasCaptured = this.props.photoWasCaptured

        // Navigate to crop component once a photo is captured
        if (photoWasCaptured) { return (<Redirect to={{ pathname: '/crop-image' }}></Redirect>) }

        // Navigate to root component if the set item is cleared
        if (this.setCollectionItemWasCleared) { return (<Redirect to={{ pathname: '/' }}></Redirect>) }

        return (
            <CameraCapture
                onTakePhoto={this.onTakePhoto}
                onClearCurrentItem={this.onClearCurrentItem}
                capturedPhotoUri={this.props.capturedPhotoUri}
                photoWasCaptured={this.props.photoWasCaptured}
                id={this.props.id}
                uuid={this.props.uuid}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    ...state.cameraState, ...state.collectionItemState
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)