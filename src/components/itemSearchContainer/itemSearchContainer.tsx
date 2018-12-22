import * as React from 'react'
import { connect } from 'react-redux'

import { ItemSearchService, SearchResponse } from '../../services/itemSearchService'
import { ItemSearchView } from './itemSearchView/itemSearchView'
import { ItemSearchForm } from './itemSearchView/itemSearchForm'
import { SearchForItem, ClearSubmittedSearchForItem, SetCollectionItem } from '../../actions/actions'

import { Redirect } from 'react-router-dom'


interface Props {
    dispatch: Function,
    itemSet: boolean,
    itemSearchResponse: SearchResponse,
    itemSearchSuccess: boolean,
    itemSearchRequestComplete: boolean,
    searchedItemId: string
}

class ItemSearchContainer extends React.Component<Props> {

    itemSearchService: ItemSearchService

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.itemSearchService = new ItemSearchService()
    }

    handleSubmit = async (event) => {
        this.props.dispatch(ClearSubmittedSearchForItem(null))
        event.preventDefault()

        let searchedItemId = event.target.itemId.value

        let itemSearchResponse = await this.itemSearchService.searchByItem(searchedItemId)
        let itemSearchSuccess = itemSearchResponse.success
        let itemSearchRequestComplete = true

        this.props.dispatch(SearchForItem({ itemSearchResponse, itemSearchSuccess, itemSearchRequestComplete, searchedItemId }))
    }

    setSearchedItem = () => {
        let itemSet = true
        let itemUuid = this.props.itemSearchResponse.uuid
        let itemId = this.props.searchedItemId

        this.props.dispatch(SetCollectionItem({ itemSet, itemUuid, itemId }))
    }

    public render() {

        const itemSearchForm = (<ItemSearchForm handleSubmit={this.handleSubmit}></ItemSearchForm>)

        if (this.props.itemSet) {
            return (
                <Redirect to="/camera-capture"></Redirect>
            )
        }

        else {
            return (
                <div>
                    <ItemSearchView
                        searchedItemId={this.props.searchedItemId}
                        itemSearchResponse={this.props.itemSearchResponse}
                        itemSearchSuccess={this.props.itemSearchSuccess}
                        itemSearchRequestComplete={this.props.itemSearchRequestComplete}
                        setSearchedItem={this.setSearchedItem}>
                    </ItemSearchView>
                    {itemSearchForm}
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedItemSearchContainer = connect(mapStateToProps)(ItemSearchContainer)