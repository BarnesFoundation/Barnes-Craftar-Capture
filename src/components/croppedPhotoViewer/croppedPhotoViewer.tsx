import * as React from 'react'
import { MatchResponse } from '../../services/searchService'

export interface Props {
    photoUri: string,
    findImageMatch: Function

    requestComplete: boolean

    imageMatchSuccess: boolean
    imageMatchResponse: MatchResponse

    requestError: boolean
    requestErrorMessage: any

}

class CroppedPhotoViewer extends React.Component<Props, object> {

    constructor(props) {
        super(props)
        this.onEvent = this.onEvent.bind(this)
    }

    async onEvent(event) {
        this.props.findImageMatch()
    }

    public render() {

        let cameraButton = (!this.props.requestComplete) ? null : (
            <button>Return to Camera</button>
        )

        
        let successSection = (
            <div>
                <p>A match was found in Catchoom for that image</p>
                <p>Image Id: {this.props.imageMatchResponse ? this.props.imageMatchResponse.id : '' }</p>
                <p>Use 'Add to Item' to add the above image as an additional reference image to the existing item</p>
                <div>
                    <button>Add to Item</button>
                    {cameraButton}
                </div>
            </div>
        )

        let failSection =  (
            <div>
                <p>No matching image was found in Catchoom for that image</p>
                {cameraButton}
            </div>
        )

        let searchButton = (
            <button onClick={this.onEvent}>Search</button>
        )

        let errorSection = (
            <div>
                <p>An error occurred when searching with that image: {this.props.requestErrorMessage}</p>
                {cameraButton}
            </div>
        )

        let photoView = (
            <div className="photoviewer photo-display">
                <img id="captured-photo" className="photoviewer captured-photo" src={this.props.photoUri}></img>
            </div>
        )

        return (
            <div>
                {photoView}
                {(this.props.requestComplete) ? null : searchButton }
                {(this.props.requestComplete && this.props.imageMatchSuccess) ? successSection : null }
                {(this.props.requestComplete && !this.props.imageMatchSuccess) ? failSection : null }
                {(this.props.requestError) ? errorSection : null }
            </div>
        )
    }
}

export { CroppedPhotoViewer }