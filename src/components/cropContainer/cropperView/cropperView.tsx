import * as React from 'react'
import { PhotoView } from '../../photoView/photoView'
import Button from '@material-ui/core/Button'

export interface Props {

    photoUri: string
    cropper: Cropper,

    initializeCropper: any,
    cropPhoto: Function
}

class CropperView extends React.Component<Props, object> {

    photoRef: React.RefObject<{}> | HTMLElement | any

    constructor(props) {
        super(props)
        this.photoRef = React.createRef()
        this.onEvent = this.onEvent.bind(this)
    }

    componentDidMount() {
        this.props.initializeCropper(this.photoRef.current)
    }

    onEvent(event) {
        this.props.cropPhoto()
    }

    public render() {
        return (
            <>
                <PhotoView photoUri={this.props.photoUri} photoRef={this.photoRef}></PhotoView>
                <Button variant="contained" onClick={this.onEvent}>Crop</Button>
            </>
        )
    }
}

export { CropperView }