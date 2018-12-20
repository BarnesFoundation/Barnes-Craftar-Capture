import * as React from 'react'
import { connect } from 'react-redux'

import { ItemSearchService } from '../../services/itemSearchService'
import { ItemSearchView } from './itemSearchView/itemSearchView'

class ItemSearchContainer extends React.Component<{}> {

    itemSearchService: ItemSearchService

    constructor(props) {
        super(props)

        this.searchByItemId = this.searchByItemId.bind(this)
        this.itemSearchService = new ItemSearchService()
    }

    searchByItemId = () => {
        this.itemSearchService.searchByItem('7311')
    }

    public render () {
        return (
            <ItemSearchView searchByItemId={this.searchByItemId}></ItemSearchView>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export const ConnectedItemSearchContainer = connect(mapStateToProps)(ItemSearchContainer)