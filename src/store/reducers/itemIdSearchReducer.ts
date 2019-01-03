import * as at from '../actionTypes/itemIdSearchActionTypes'
import * as a from '../actions/itemIdSearchActions'
import { Action } from '../../interfaces/action'

import { SearchResponse } from '../../services/itemSearchService'

export interface ItemIdSearchState {
    response: {} | SearchResponse,
    success: boolean,
    requestInProgress: null,
    requestComplete: boolean, 
    searchedId: string
}

export const initialState: ItemIdSearchState = {
    response: {},
    success: null,
    requestInProgress: null,
    requestComplete: null,
    searchedId: null
}

export function itemIdSearchState(state = initialState, action: Action) {

    switch (action.type) {

        case at.UPDATE_ITEM_ID_SEARCH_DATA: {

            const { response, success, searchedId } = action.payload

            return { ...state, response, success, searchedId }
        }

        case at.UPDATE_ITEM_ID_SEARCH_STATUS: {

            const { requestInProgress, requestComplete } = action.payload

            return { ...state, requestInProgress, requestComplete }
        }

        case at.RESET_ITEM_ID_SEARCH: {
            return { response: {}, success: null, requestInProgress: null, requestComplete: null, searchedId: null }
        }

        default: {
            return state
        }
    }
}