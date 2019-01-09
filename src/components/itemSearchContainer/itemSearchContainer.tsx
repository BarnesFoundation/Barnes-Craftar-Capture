import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { ItemSearchService, SearchResponse } from '../../services/itemSearchService'
import { ItemImageRetrievalService } from '../../services/itemImageRetrievalService'
import { ItemSearchView } from './itemSearchView/itemSearchView'

import { UpdateItemIdSearchData, UpdateItemIdSearchStatus, SubmitItemIdSearchForm, ResetItemIdSearch, UpdateItemImageUrl } from '../../store/actions/itemIdSearchActions'
import { SetCollectionItem } from '../../store/actions/collectionItemActions'

interface Props {

    dispatch: Function,

    // Item Id Search State
    response: SearchResponse,
    success: boolean,
    requestInProgress: boolean,
    requestComplete: boolean,
    searchedId: string,
    itemImageUrl: string,

    // Collection Item State
    id: string,
    uuid: string
}

class ItemSearchContainer extends React.Component<Props> {

    itemSearchService: ItemSearchService
    itemImageRetrievalService: ItemImageRetrievalService

    constructor(props) {
        super(props)
        this.itemSearchService = new ItemSearchService()
        this.itemImageRetrievalService = new ItemImageRetrievalService()
    }

    componentWillUnmount() { this.props.dispatch(new ResetItemIdSearch()) }

    handleSubmit = async (event) => {

        // Prevent default behavior and reset the search before starting a new one
        event.preventDefault()
        this.props.dispatch(new ResetItemIdSearch())

        // Update that request is in progress
        let requestInProgress = true
        let requestComplete = false
        this.props.dispatch(new UpdateItemIdSearchStatus({ requestInProgress, requestComplete }))

        // Get the id to search
        const searchedId = event.target.itemId.value

        // Update with response data
        const response = await this.itemSearchService.searchByItem(searchedId)
        const success = response.success
        this.props.dispatch(new UpdateItemIdSearchData({ response, success, searchedId }))

        // Retrieve image for item 
        if (success) {
            const itemImageUrl = await this.itemImageRetrievalService.retrieveImage(response.uuid)
            if (itemImageUrl) {
                this.props.dispatch(new UpdateItemImageUrl({ itemImageUrl }))
            }
        }

        // Update that request is complete
        requestInProgress = false
        requestComplete = true
        this.props.dispatch(new UpdateItemIdSearchStatus({ requestInProgress, requestComplete }))
    }

    setSearchedItem = (event: any) => {
        const uuid = this.props.response.uuid
        const id = this.props.searchedId
        this.props.dispatch(new SetCollectionItem({ id, uuid }))
    }

    public render() {

        const { searchedId, response, success, requestInProgress, requestComplete, id, itemImageUrl } = this.props

        if (id) {
            return (
                <Redirect to="/camera-capture"></Redirect>
            )
        }

        return (
            <ItemSearchView
                searchedId={searchedId}
                response={response}
                success={success}
                itemImageUrl={itemImageUrl}
                requestInProgress={requestInProgress}
                requestComplete={requestComplete}
                setSearchedItem={this.setSearchedItem}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    ...state.itemIdSearchState, ...state.collectionItemState
})

export const ConnectedItemSearchContainer = connect(mapStateToProps)(ItemSearchContainer)