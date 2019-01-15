import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetCapturedPhotoData, ClearCapturedPhoto, UpdatePhotoLoaded } from '../../store/actions/cameraActions'
import { ResetSetCollectionItem } from '../../store/actions/collectionItemActions'
import { ResizeService } from '../../services/resizeService'
import { CameraCapture } from './cameraCapture/cameraCapture'

export interface Props {
    dispatch: Function,

    // Camera State
    capturedPhotoUri: string,
    photoIsLoading: boolean,
    photoIsLoaded: boolean,

    // Collection Item State
    id: string,
    uuid: string, 
    itemImageUrl: string,
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

        // Update that photo is loading
        let photoIsLoading = true
        let photoIsLoaded = false
        this.props.dispatch(new UpdatePhotoLoaded({ photoIsLoading, photoIsLoaded }))

        // Get the file and convert to correctly oriented uri
        const fileUrl = URL.createObjectURL(event.target.files[0])
        const orientedPhotoUri = await this.resizeService.correctImageOrientation(fileUrl) as string;
        const capturedPhotoUri = await this.resizeService.resizeImage(orientedPhotoUri, 'URI', 'DISPLAY_IMAGE') as string;
        this.props.dispatch(new SetCapturedPhotoData({ capturedPhotoUri }))

        // Revoke the url now that it's stored
        URL.revokeObjectURL(fileUrl)

        // Update that photo is loaded
        photoIsLoading = false
        photoIsLoaded = true
        this.props.dispatch(new UpdatePhotoLoaded({ photoIsLoading, photoIsLoaded }))
    }

    onClearCurrentItem = (event) => {
        this.setItemWasCleared = true
        this.props.dispatch(new ResetSetCollectionItem())
    }

    public render() {

        const { id, capturedPhotoUri, photoIsLoading, photoIsLoaded, itemImageUrl } = this.props

        // Navigate to crop component once a photo is captured
        if (photoIsLoaded) {
            return (<Redirect to={{ pathname: '/crop-image' }}></Redirect>)
        }

        // Navigate to root component if the set item is cleared
        if (this.setItemWasCleared) { return (<Redirect to={{ pathname: '/' }}></Redirect>) }

        return (
            <CameraCapture
                onTakePhoto={this.onTakePhoto}
                onClearCurrentItem={this.onClearCurrentItem}
                capturedPhotoUri={capturedPhotoUri}
                photoIsLoading={photoIsLoading}
                photoIsLoaded={photoIsLoaded}
                id={id}
                itemImageUrl={itemImageUrl}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    ...state.cameraState, ...state.collectionItemState
})

export const ConnectedCameraContainer = connect(mapStateToProps)(CameraContainer)