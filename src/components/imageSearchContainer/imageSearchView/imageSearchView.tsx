import * as React from 'react'
import { PhotoView } from '../../photoView/photoView'
import { LoadingDialog } from '../../../shared/components/loadingDialog'
import { MatchResponse } from '../../../services/searchService'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'


export interface Props {
    photoUri: string,
    findImageMatch: Function
    setCollectionItem: Function

    requestInProgress: boolean,
    requestComplete: boolean,

    success: boolean,
    response: MatchResponse,

    error: boolean,
    errorMessage: any
}

class ImageSearchView extends React.Component<Props, object> {

    constructor(props) {
        super(props)
        this.findImageMatch = this.findImageMatch.bind(this)
        this.setItem = this.setItem.bind(this)
    }

    findImageMatch(event) {
        this.props.findImageMatch()
    }

    setItem(event) {
        this.props.setCollectionItem()
    }

    public render() {

        const { requestInProgress, requestComplete, response, success, error, errorMessage } = this.props

        const displayText = 'Searching Catchoom for the image'

        let successSection = null
        let setItem = null
        let failSection = null
        let errorSection = null

        if (requestComplete && !error) {

            let id = response.id

            setItem = (<Button variant="contained" onClick={this.setItem}>Set Item</Button>)

            successSection = (
                <div>
                    <p>A matching item was found for this image</p>
                    <p>Image Id: {id}</p>
                    <p>Use 'Set Item' to capture reference images for the above item</p>
                </div>
            )

            failSection = (<p>No matching item was found for this image</p>)
        }

        if (requestComplete && error) {
            errorSection = (<p>An error occurred when searching with that image: {errorMessage}</p>)
        }

        let searchButton = (<Button variant="contained" onClick={this.findImageMatch}>Search</Button>)
        let photoView = (<PhotoView photoUri={this.props.photoUri}></PhotoView>)
        let cameraBtn = (<Button variant="contained" component={({ innerRef, ...props }) => <Link {...props} to="/camera-capture" />}>Return to Camera</Button>)

        return (
            <div className="image-search-container">
                {photoView}
                {(requestComplete) ? null : searchButton}
                {(requestComplete && success) ? successSection : null}
                {(requestComplete && !success) ? failSection : null}
                {(error) ? errorSection : null}
                {(requestComplete && success) ? setItem : null}
                {cameraBtn}
                {(requestInProgress) ? <LoadingDialog displayText={displayText} dialogOpen={true} /> : null}
            </div>
        )
    }
}

export { ImageSearchView }