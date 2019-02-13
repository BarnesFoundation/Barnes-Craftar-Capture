import * as at from '../actionTypes/itemIdSearchActionTypes'
import * as a from '../actions/itemIdSearchActions'
import { Action } from '../../interfaces/action'

import { SearchResponse } from '../../services/itemSearchService'

export interface ItemIdSearchState {
    response: any,
    success: boolean,
    requestInProgress: null,
    requestComplete: boolean,
    searchedId: string,
    itemImageUrl: string,
    setItemClicked: boolean
}

export const initialState: ItemIdSearchState = {
    response: {},
    success: null,
    requestInProgress: null,
    requestComplete: null,
    searchedId: null,
    itemImageUrl: null,
    setItemClicked: null
}

export function itemIdSearchState(state = initialState, action: Action) {

    switch (action.type) {

        case at.UPDATE_ITEM_ID_SEARCH_DATA: {

            const { response, success, searchedId } = action.payload

            return { ...state, response, success, searchedId }
        }

        case at.UPDATE_SET_ITEM_CLICKED: {

            const { setItemClicked } = action.payload

            return { ...state, setItemClicked }
        }

        case at.UPDATE_ITEM_ID_SEARCH_STATUS: {

            const { requestInProgress, requestComplete } = action.payload

            return { ...state, requestInProgress, requestComplete }
        }

        case at.RESET_ITEM_ID_SEARCH: {
            return { ...state, response: {}, success: null, requestInProgress: null, requestComplete: null, searchedId: null, itemImageUrl: null, setItemClicked: null }
        }

        case at.UPDATE_ITEM_IMAGE_URL: {

            const { itemImageUrl } = action.payload

            return { ...state, itemImageUrl: itemImageUrl }
        }

        default: {
            return state
        }
    }
}
