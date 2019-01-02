import * as at from '../actionTypes/itemIdSearchActionTypes'
import * as a from '../actions/itemIdSearchActions'
import { Action } from '../../interfaces/action'

import { SearchResponse } from '../../services/itemSearchService'

export interface ItemIdSearchState {
    response: {} | SearchResponse,
    success: boolean,
    requestComplete: boolean, 
    id: string
}

export const initialState: ItemIdSearchState = {
    response: {},
    success: null,
    requestComplete: null,
    id: null
}

export function itemIdSearchReducer(state = initialState, action: Action) {

    switch (action.type) {

        case at.EXECUTE_ITEM_ID_SEARCH: {

            const { response, success, requestComplete } = action.payload

            return { ...state, response, success, requestComplete }
        }

        case at.RESET_ITEM_ID_SEARCH: {
            return undefined
        }
    }
}