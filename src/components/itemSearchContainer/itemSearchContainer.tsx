import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { ItemSearchService, SearchResponse } from '../../services/itemSearchService'
import { ItemSearchView } from './itemSearchView/itemSearchView'

import { ExecuteItemIdSearch, SubmitItemIdSearchForm, ResetItemIdSearch } from '../../store/actions/itemIdSearchActions'
import { SetCollectionItem } from '../../store/actions/collectionItemActions'

interface Props {

    dispatch: Function,

    // Image Search State
    response: SearchResponse,
    success: boolean,
    requestComplete: boolean,
    searchedId: string

    // Collection Item State
    id: string,
    uuid: string
}

class ItemSearchContainer extends React.Component<Props> {

    itemSearchService: ItemSearchService

    constructor(props) {
        super(props)
        this.itemSearchService = new ItemSearchService()
    }

    componentWillUnmount() { this.props.dispatch(new ResetItemIdSearch()) }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.props.dispatch(new ResetItemIdSearch())

        const searchedId = event.target.itemId.value
        const response = await this.itemSearchService.searchByItem(searchedId)
        const success = response.success
        const requestComplete = true

        this.props.dispatch(new ExecuteItemIdSearch({ response, success, requestComplete, searchedId }))
    }

    setSearchedItem = (event: any) => {
        const uuid = this.props.response.uuid
        const id = this.props.searchedId
        this.props.dispatch(new SetCollectionItem({ id, uuid }))
    }

    public render() {

        const { searchedId, response, success, requestComplete, id } = this.props

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