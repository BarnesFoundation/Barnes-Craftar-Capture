import * as at from '../actionTypes/invnoSearchActionTypes'
import * as a from '../actions/invnoSearchActions'
import { Action } from '../../interfaces/action'

export interface InvnoSearchState {
    response: {},
    success: boolean,
    requestInProgress: null,
    requestComplete: boolean,
    searchedInvno: string,
    searchedId: string,
    itemImageUrl: string
}

export const initialState: InvnoSearchState = {
    response: { idResponse: {} },
    success: null,
    requestInProgress: null,
    requestComplete: null,
    searchedInvno: null,
    searchedId: null,
    itemImageUrl: null
}

export function invnoSearchState(state = initialState, action: Action) {

    switch (action.type) {

        case at.UPDATE_INVNO_SEARCH_DATA: {

            const { response, success, searchedInvno, searchedId } = action.payload

            return { ...state, response, success, searchedInvno, searchedId }
        }

        case at.UPDATE_INVNO_SEARCH_STATUS: {

            const { requestInProgress, requestComplete } = action.payload

            return { ...state, requestInProgress, requestComplete }
        }

        case at.RESET_INVNO_SEARCH: {
            return initialState
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