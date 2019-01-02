import * as React from 'react'
import { ImageSearchView } from './imageSearchView/imageSearchView'
import { SearchService, MatchResponse } from '../../services/searchService'
import { connect } from 'react-redux'
import { ResetImageSearch, ExecuteImageSearch } from '../../store/actions/imageSearchActions'
import { SetCollectionItem } from '../../store/actions/collectionItemActions'
import { Redirect } from 'react-router-dom'
import { ResizeService } from 'src/services/resizeService';

export interface Props {

    dispatch: Function,

    // Crop State
    croppedPhotoUri: string,

    // Collection Item State
    id: string,
    uuid: string

    // Image Search State
    response: MatchResponse,
    success: boolean,
    requestComplete: boolean
    error: boolean,
    errorMessage: string,
}

class ImageSearchContainer extends React.Component<Props> {

    searchService: SearchService
    resizeService: ResizeService

    constructor(props) {
        super(props)
        this.searchService = new SearchService()
        this.resizeService = new ResizeService()
    }

    componentWillUnmount() { this.props.dispatch(new ResetImageSearch()) }

    imageSearch = async () => {

        let response
        let success
        let requestComplete
        let error = null
        let errorMessage = null

        try {

            console.log('Resizing prior to search')

            // Resize the image as a blob and execute the search
            const imageBlob = await this.resizeService.resizeImage(this.props.croppedPhotoUri, 'BLOB', 'QUERY_IMAGE') as Blob
            response = await this.searchService.findImageMatch(imageBlob)
            success = response.success
        }

        catch (errorOutput) {

            // Error information
            success = false
            errorMessage = errorOutput
            error = true
        }
        
        requestComplete = true

        // Store the image search information
        this.props.dispatch(new ExecuteImageSearch({ response, success, requestComplete, error, errorMessage }))
    }

    setCollectionItem = () => {
        const { id, uuid } = this.props.response
        this.props.dispatch(new SetCollectionItem({ id, uuid }))
    }

    public render() {

        const { id } = this.props

        // If the id was set, navigate to Camera Container component
        if (id) {
            return (
                <Redirect to="/camera-capture"></Redirect>
            )
        }

        return (
            <ImageSearchView
                setCollectionItem={this.setCollectionItem}
                photoUri={this.props.croppedPhotoUri}
                findImageMatch={this.imageSearch}
                imageMatchSuccess={this.props.success}
                imageMatchResponse={this.props.response}
                requestError={this.props.error}
                requestErrorMessage={this.props.errorMessage}
                requestComplete={this.props.requestComplete}>
            </ImageSearchView>
        )
    }
}

const mapStateToProps = state => ({
    ...state.imageSearchState, ...state.collectionItemState, ...state.cropState
})

export const ConnectedImageSearchContainer = connect(mapStateToProps)(ImageSearchContainer)