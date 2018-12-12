import * as React from 'react'
import { MatchResponse } from '../../services/searchService'

export interface Props {
    photoUri: string,
    findImageMatch: Function
    matchRequestComplete: boolean
    matchResponse: MatchResponse
    matchRequestError: any

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

        let matchResponseSection = (!this.props.matchResponse) ? null : (
            <div>
                <p>A match was found in Catchoom for that image</p>
                <p>Image Id: {this.props.matchResponse.id}</p>
            </div>
        )

        let searchButton = (this.props.matchRequestComplete) ? null : (
            <button onClick={this.onEvent}>Search</button>
        )

        let matchRequestError = (!this.props.matchRequestError) ? null : (
            <p>An error occurred when searching with that image: {this.props.matchRequestError}</p>
        )

        let photoView = (
            <div className="photoviewer photo-display">
                <img id="captured-photo" className="photoviewer captured-photo" src={this.props.photoUri}></img>
            </div>
        )

        return (
            <div>
                {photoView}
                {searchButton}
                {matchResponseSection}
                {matchRequestError}
            </div>
        )
    }
}

export { CroppedPhotoViewer }