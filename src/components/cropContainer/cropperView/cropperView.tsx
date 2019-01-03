import * as React from 'react'
import { PhotoView } from '../../photoView/photoView'
import Button from '@material-ui/core/Button'

import { LoadingDialog } from '../../../shared/components/loadingDialog'

export interface Props {

    photoUri: string
    cropper: Cropper,

    initializeCropper: any,
    cropPhoto: Function

    photoWasCropped: boolean
    croppingIsLoading: boolean
    croppingIsFinished: boolean
}

class CropperView extends React.Component<Props, object> {

    photoRef: React.RefObject<{}> | HTMLElement | any

    constructor(props) {
        super(props)
        this.photoRef = React.createRef()
    }

    componentDidMount() {
        this.props.initializeCropper(this.photoRef.current)
    }

    onEvent = (event) => {
        this.props.cropPhoto()
    }

    public render() {

        const { croppingIsLoading, croppingIsFinished, photoWasCropped } = this.props

        const displayText = 'Cropping image'
        console.log('cropping is loading ' , croppingIsLoading)

        return (
            <div className="crop-container">
                {(croppingIsLoading) ? <LoadingDialog dialogOpen={true} displayText={displayText} /> : null}
                <PhotoView photoUri={this.props.photoUri} photoRef={this.photoRef}></PhotoView>
                <Button variant="contained" onClick={this.onEvent}>Crop</Button>
            </div>
        )
    }
}

export { CropperView }