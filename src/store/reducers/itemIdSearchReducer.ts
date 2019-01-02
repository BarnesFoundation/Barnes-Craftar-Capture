import * as at from '../actionTypes/itemIdSearchActionTypes'
import * as a from '../actions/itemIdSearchActions'
import { Action } from '../../interfaces/action'

import { SearchResponse } from '../../services/itemSearchService'

export interface ItemIdSearchState {
    response: {} | SearchResponse,
    success: boolean,
    requestComplete: boolean, 
    searchedId: string
}

export const initialState: ItemIdSearchState = {
    response: {},
    success: null,
    requestComplete: null,
    searchedId: null
}

export function itemIdSearchState(state = initialState, action: Action) {

    switch (action.type) {

        case at.EXECUTE_ITEM_ID_SEARCH: {

            const { response, success, requestComplete, searchedId } = action.payload

            return { ...state, response, success, requestComplete, searchedId }
        }

        case at.RESET_ITEM_ID_SEARCH: {
            return { response: {}, success: null, requestComplete: null, searchedId: null }
        }

        default: {
            return state
        }
    }
}