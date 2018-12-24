import * as React from 'react'
import { ImageSearchView } from './imageSearchView/imageSearchView'
import { SearchService, MatchResponse } from '../../services/searchService'
import { connect } from 'react-redux'
import { SearchForImage, SearchForImageError, SearchForImageRequestComplete, SetCollectionItem, ClearSearchData, ClearPhotoData } from '../../actions/actions'
import { Redirect } from 'react-router-dom'

export interface Props {
    croppedPhotoUri: string,
    croppedPhotoBlob: Blob,
    dispatch: Function,

    itemSet: boolean,
    itemId: string,
    itemUuid: string,

    imageMatchResponse: MatchResponse,
    imageMatchSuccess: boolean,
    requestComplete: boolean
    requestError: boolean,
    requestErrorMessage: string,
}

class ImageSearchContainer extends React.Component<Props> {

    searchService: SearchService

    constructor(props) {
        super(props)

        this.searchService = new SearchService()

        this.imageSearch = this.imageSearch.bind(this)
        this.setCollectionItem = this.setCollectionItem.bind(this)
    }

    async imageSearch() {
        try {
            let imageMatchResponse = await this.searchService.findImageMatch(this.props.croppedPhotoBlob)
            let imageMatchSuccess = imageMatchResponse.success

            this.props.dispatch(SearchForImage({ imageMatchResponse, imageMatchSuccess }))
        }

        catch (error) {
            let requestErrorMessage = error
            let requestError = true
            let imageMatchSuccess = false

            this.props.dispatch(SearchForImageError({ requestErrorMessage, requestError }))
        }
        let requestComplete = true
        this.props.dispatch(SearchForImageRequestComplete({ requestComplete }))
        }

    setCollectionItem() {
        let itemSet = true
        let itemId = this.props.imageMatchResponse.id
        let itemUuid = this.props.imageMatchResponse.uuid

        this.props.dispatch(SetCollectionItem({ itemSet, itemId, itemUuid }))
        this.props.dispatch(ClearPhotoData(null))
        this.props.dispatch(ClearSearchData(null))
    }

    public render() {

        if (this.props.itemSet) {
            return (
                <Redirect to="/camera-capture"></Redirect>
            )
        }

        else {
            return (
                <ImageSearchView
                    setCollectionItem={this.setCollectionItem}
                    photoUri={this.props.croppedPhotoUri}
                    findImageMatch={this.imageSearch}
                    imageMatchSuccess={this.props.imageMatchSuccess}
                    imageMatchResponse={this.props.imageMatchResponse}
                    requestError={this.props.requestError}
                    requestErrorMessage={this.props.requestErrorMessage}
                    requestComplete={this.props.requestComplete}>
                </ImageSearchView>
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedImageSearchContainer = connect(mapStateToProps)(ImageSearchContainer)