import * as React from 'react'
import { connect } from 'react-redux'

import { ItemSearchService, SearchResponse } from '../../services/itemSearchService'
import { ItemSearchView } from './itemSearchView/itemSearchView'
import { SearchForItem } from '../../actions/actions'

interface Props {
    dispatch: Function,
    itemSearchResponse: SearchResponse,
    itemSearchSuccess: boolean,
    itemSearchRequestComplete: boolean,
}

class ItemSearchContainer extends React.Component<Props> {

    itemSearchService: ItemSearchService

    constructor(props) {
        super(props)

        this.itemSearch = this.itemSearch.bind(this)
        this.itemSearchService = new ItemSearchService()
    }

    itemSearch = async () => {
        let itemSearchResponse = await this.itemSearchService.searchByItem('7311')
        let itemSearchSuccess = itemSearchResponse.success
        let itemSearchRequestComplete = true

        this.props.dispatch(SearchForItem({ itemSearchResponse, itemSearchSuccess, itemSearchRequestComplete}))
    }

    public render () {
        return (
            <ItemSearchView itemSearch={this.itemSearch}></ItemSearchView>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedItemSearchContainer = connect(mapStateToProps)(ItemSearchContainer)