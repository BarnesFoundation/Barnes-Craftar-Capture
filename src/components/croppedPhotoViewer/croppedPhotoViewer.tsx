import * as React from 'react'
import { SearchService } from '../../services/searchService'

export interface Props {
    photoUri: string,
    photoBlob: Blob
}

class CroppedPhotoViewer extends React.Component<Props, object> {

    searchService: SearchService

    constructor(props) {
        super(props)

        this.onEvent = this.onEvent.bind(this)
        this.searchService = new SearchService()
    }

    async onEvent(event) {
        console.log('Catchooming')
        let match = await this.searchService.findImageMatch(this.props.photoBlob)
    }

    public render() {
        return (
            <div>
                <div className="photoviewer photo-display">
                    <img id="captured-photo" className="photoviewer captured-photo" src={this.props.photoUri}></img>
                </div>
                <div>
                    <button onClick={this.onEvent}>Crop</button>
                </div>
            </div>
        )
    }
}

export { CroppedPhotoViewer }