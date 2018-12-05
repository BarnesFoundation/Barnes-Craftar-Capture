import * as React from 'react'
import { imageFile1 } from '../../constants'

export interface Props {
    photoUri: string
}

class PhotoViewer extends React.Component<Props, object> {

    public render() {
        return (
            <div className="photo-display">
                <img className="captured-photo" src={imageFile1}></img>
            </div>
        )
    }
}

export { PhotoViewer }