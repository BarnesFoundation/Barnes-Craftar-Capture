import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { InvnoSearchService, InvnoResponse } from '../../services/invnoSearchService'
import { ItemImageRetrievalService } from '../../services/itemImageRetrievalService'
import { InvnoSearchView } from './invnoSearchView/invnoSearchView'

import { UpdateSetItemClicked, UpdateInvnoSearchData, UpdateInvnoSearchStatus, ResetInvnoSearch, UpdateItemImageUrl } from '../../store/actions/invnoSearchActions'
import { SetCollectionItem } from '../../store/actions/collectionItemActions'

interface Props {

    dispatch: Function,

    // Invno Search State
    response: InvnoResponse , //SearchResponse,
    success: boolean,
    requestInProgress: boolean,
    requestComplete: boolean,
    searchedInvno: string,
    searchedId: string,

    // Collection Item State
    id: string,
    uuid: string,
    itemImageUrl: string,
    setInvnoClicked: boolean,
}

class InvnoSearchContainer extends React.Component<Props> {

    invnoSearchService: InvnoSearchService
    itemImageRetrievalService: ItemImageRetrievalService

    itemImageUrl: string

    constructor(props) {
        super(props)
        this.invnoSearchService = new InvnoSearchService()
        this.itemImageRetrievalService = new ItemImageRetrievalService()
    }

    componentWillUnmount() {
        this.props.dispatch(new ResetInvnoSearch())
    }

    handleSubmit = async (event) => {

        // Prevent default behavior and reset the search before starting a new one
        event.preventDefault()

        // Update that request is in progress
        let requestInProgress = true
        let requestComplete = false
        this.props.dispatch(new UpdateInvnoSearchStatus({ requestInProgress, requestComplete }))

        // Get the invno to search
        const searchedInvno = event.target.invno.value

        // Update with response data
        const response = await this.invnoSearchService.searchByInvno(searchedInvno)
        const success = response.success

        if (success) {
            this.itemImageUrl = await this.itemImageRetrievalService.retrieveImage(response.idResponse.uuid)
            this.props.dispatch(new UpdateItemImageUrl({ itemImageUrl: this.itemImageUrl }))
        }

        this.props.dispatch(new UpdateInvnoSearchData({ response, success, searchedInvno }))

        // Update that request is complete
        requestInProgress = false
        requestComplete = true
        this.props.dispatch(new UpdateInvnoSearchStatus({ requestInProgress, requestComplete }))
    }

    setSearchedItem = async (event: any) => {

        const uuid = this.props.response.idResponse.uuid
        const id = this.props.response.id
        const itemImageUrl = this.itemImageUrl
        const setInvnoClicked = true

        this.props.dispatch(new SetCollectionItem({ id, uuid, itemImageUrl }))

        this.props.dispatch(new UpdateSetItemClicked({ setInvnoClicked }))
    }

    public render() {

        const { searchedInvno, response, success, requestInProgress, requestComplete, id, setInvnoClicked } = this.props
        if (id && setInvnoClicked) {
            return (
                <Redirect to="/camera-capture"></Redirect>
            )
        }

        return (
            <InvnoSearchView
                searchedInvno={searchedInvno}
                response={response.idResponse}
                success={success}
                itemImageUrl={this.itemImageUrl}
                requestInProgress={requestInProgress}
                requestComplete={requestComplete}
                setSearchedItem={this.setSearchedItem}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({
    ...state.invnoSearchState, ...state.collectionItemState
})

export const ConnectedInvnoSearchContainer = connect(mapStateToProps)(InvnoSearchContainer)
