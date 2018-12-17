import * as React from 'react'

export interface Props {
    photoUri: string,
    photoRef?: any
}

class PhotoView extends React.Component<Props, object> {

    public render() {
        return (
            <div className="photoviewer photo-display">
                <img id="captured-photo" className="photoviewer captured-photo" ref={this.props.photoRef} src={this.props.photoUri}></img>
            </div>
        )
    }
}

export { PhotoView }