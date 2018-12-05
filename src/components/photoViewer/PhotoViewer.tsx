import * as React from 'react'

export interface Props {
    photoUri: string
}

class PhotoViewer extends React.Component<Props, object> {

    public render() {
        return (
            <div>
                <img src={this.props.photoUri}></img>
            </div>
        )
    }
}

export { PhotoViewer }