import * as React from 'react'


export interface Props {
    photoUri: string,
    findImageMatch: Function
}

class CroppedPhotoViewer extends React.Component<Props, object> {


    constructor(props) {
        super(props)
        this.onEvent = this.onEvent.bind(this)
    }

    onEvent(event) {
        this.props.findImageMatch()
    }

    public render() {
        return (
            <div>
                <div className="photoviewer photo-display">
                    <img id="captured-photo" className="photoviewer captured-photo" src={this.props.photoUri}></img>
                </div>
                <div>
                    <button onClick={this.onEvent}>Identify</button>
                </div>
            </div>
        )
    }
}

export { CroppedPhotoViewer }