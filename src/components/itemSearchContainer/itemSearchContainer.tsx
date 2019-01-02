import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { ItemSearchService, SearchResponse } from '../../services/itemSearchService'
import { ItemSearchView } from './itemSearchView/itemSearchView'
import { ItemSearchForm } from './itemSearchView/itemSearchForm'
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

    componentWillUnmount() {
        this.props.dispatch(new ResetItemIdSearch())
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.props.dispatch(new ResetItemIdSearch())

        const searchedId = event.target.itemId.value
        const response = await this.itemSearchService.searchByItem(searchedId)
        const success = response.success
        const requestComplete = true

        this.props.dispatch(new ExecuteItemIdSearch({ response, success, requestComplete, searchedId }))
    }

    setSearchedItem = () => {
        const uuid = this.props.response.uuid
        const id = this.props.searchedId

        this.props.dispatch(new SetCollectionItem({ id, uuid }))
    }

    public render() {

        const searchedId = this.props.searchedId
        const response = this.props.response
        const success = this.props.success
        const requestComplete = this.props.requestComplete

        const id = this.props.id

        const itemSearchForm = (<ItemSearchForm handleSubmit={this.handleSubmit}></ItemSearchForm>)
        const setItemButton = (<Button variant="contained" onClick={this.setSearchedItem}>Set item</Button>)

        if (id) {
            return (
                <Redirect to="/camera-capture"></Redirect>
            )
        }

        return (
            <div className="item-search-container">
                <ItemSearchView
                    searchedItemId={searchedId}
                    itemSearchResponse={response}
                    itemSearchSuccess={success}
                    itemSearchRequestComplete={requestComplete}
                    setSearchedItem={this.setSearchedItem}>
                </ItemSearchView>
                {itemSearchForm}
                <div className="button-container">
                    {(requestComplete && success) ? setItemButton : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.itemIdSearchState, ...state.collectionItemState
})

export const ConnectedItemSearchContainer = connect(mapStateToProps)(ItemSearchContainer)