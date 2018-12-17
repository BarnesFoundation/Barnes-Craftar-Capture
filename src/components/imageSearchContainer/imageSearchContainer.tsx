import * as React from 'react'
import { RouteProps } from 'react-router-dom';
import { ImageSearchView } from './imageSearchView/imageSearchView'
import { SearchService, MatchResponse } from '../../services/searchService'

export interface Props {
    photoUri: string,
    photoBlob: Blob
}

class ImageSearchContainer extends React.Component<Props & RouteProps, object> {

    searchService: SearchService

    imageMatchResponse: MatchResponse = null
    imageMatchSuccess: boolean = null

    requestError: boolean = null
    requestErrorMessage: any = null

    constructor(props) {
        super(props)
        this.imageSearch = this.imageSearch.bind(this)
        this.setImageItem = this.setImageItem.bind(this)
        this.searchService = new SearchService()
    }

    state = {
        photoUri: this.props.location.state.photoUri,
        photoBlob: this.props.location.state.photoBlob,
        requestComplete: false,
    }

    async imageSearch() {
        try {
            this.imageMatchResponse = await this.searchService.findImageMatch(this.state.photoBlob)
            this.imageMatchSuccess = this.imageMatchResponse.success
        }

        catch (error) {
            this.requestErrorMessage = error
            this.requestError = true
            this.imageMatchSuccess = false
        }
        this.setState({ requestComplete: true })
    }

    setImageItem() {
  
    }

    public render() {
        return (
            <ImageSearchView
                photoUri={this.state.photoUri}
                findImageMatch={this.imageSearch}
                imageMatchSuccess={this.imageMatchSuccess}
                imageMatchResponse={this.imageMatchResponse}
                requestError={this.requestError}
                requestErrorMessage={this.requestErrorMessage}
                requestComplete={this.state.requestComplete}>
            </ImageSearchView>
        )
    }
}

export { ImageSearchContainer }