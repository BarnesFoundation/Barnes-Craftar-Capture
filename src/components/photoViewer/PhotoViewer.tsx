import * as React from 'react'

export interface Props {

    photoUri: string
    cropper: any,

    setPhotoCrop: any,
    getPhotoCrop: any
}

class PhotoViewer extends React.Component<Props, object> {

    photo: React.RefObject<{}> | HTMLElement | any

    constructor(props) {
        super(props)

        this.photo = React.createRef()
        this.onEvent = this.onEvent.bind(this)
    }

    componentDidMount() {
        this.props.setPhotoCrop(this.photo.current)
    }

    onEvent(event) {
        this.props.getPhotoCrop()
    }

    public render() {
        return (
            <div>
                <div className="photoviewer photo-display">
                    <img id="captured-photo" className="photoviewer captured-photo" ref={this.photo} src={this.props.photoUri}></img>
                </div>
                <div>
                    <button onClick={this.onEvent}>Crop</button>
                </div>
            </div>
        )
    }
}

export { PhotoViewer }