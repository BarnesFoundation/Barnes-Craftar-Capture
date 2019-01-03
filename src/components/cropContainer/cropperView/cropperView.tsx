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

        const { croppingIsLoading, croppingIsFinished, photoWasCropped, photoUri } = this.props

        const displayText = 'Cropping image'
        console.log('cropping is loading ', croppingIsLoading)

        return (
            <div className="crop-container">
                <h2>Crop Image</h2>
                <p>Adjust the crop to focus in on the artwork.</p>
                <PhotoView photoUri={photoUri} photoRef={this.photoRef}></PhotoView>
                {/* <p>Expand the crop to capture additional areas relevant to the item such as</p>
                <ul>
                    <li>Borders</li>
                    <li>Frames</li>
                    <li>Containers</li>
                </ul> */}
                <Button variant="contained" onClick={this.onEvent}>Crop</Button>
                {(croppingIsLoading) ? <LoadingDialog dialogOpen={true} displayText={displayText} /> : null}
            </div>
        )
    }
}

export { CropperView }