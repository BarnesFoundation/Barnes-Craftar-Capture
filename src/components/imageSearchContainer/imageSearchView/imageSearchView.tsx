import * as React from 'react'
import { PhotoView } from '../../photoView/photoView'
import { MatchResponse } from '../../../services/searchService'
import { Link } from 'react-router-dom';

export interface Props {
    photoUri: string,
    findImageMatch: Function
    setCollectionItem: Function

    requestComplete: boolean

    imageMatchSuccess: boolean
    imageMatchResponse: MatchResponse

    requestError: boolean
    requestErrorMessage: any
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

        let successSection = null
        let setItem = null
        let failSection = null
        let errorSection = null

        if (this.props.requestComplete) {

            let id = this.props.imageMatchResponse.id
            let uuid = this.props.imageMatchResponse.uuid

            setItem = (
                <button onClick={this.setItem}>Set Item</button>
            )

            successSection = (
                <div>
                    <p>A match was found in Catchoom for that image</p>
                    <p>Image Id: {id}</p>
                    <p>Use 'Set Item' to capture reference images for the above item</p>
                    {setItem}
                </div>
            )

            failSection = (
                <div>
                    <p>No matching image was found in Catchoom for that image</p>
                    <p>Use 'Add New Item' to add this image as a new item</p>
                </div>
            )

            errorSection = (
                <div>
                    <p>An error occurred when searching with that image: {this.props.requestErrorMessage}</p>
                </div>
            )

        }

        let searchButton = (
            <button onClick={this.findImageMatch}>Search</button>
        )

        let photoView = (
            <PhotoView photoUri={this.props.photoUri}></PhotoView>
        )

        return (
            <div>
                {photoView}
                {(this.props.requestComplete) ? null : searchButton}
                {(this.props.requestComplete && this.props.imageMatchSuccess) ? successSection : null}
                {(this.props.requestComplete && !this.props.imageMatchSuccess) ? failSection : null}
                {(this.props.requestError) ? errorSection : null}
            </div>
        )
    }
}

export { ImageSearchView }