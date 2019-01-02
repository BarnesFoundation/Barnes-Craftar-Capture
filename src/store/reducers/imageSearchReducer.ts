import * as at from '../actionTypes/imageSearchActionTypes'
import * as a from '../actions/imageSearchActions'
import { Action } from '../../interfaces/action'

import { MatchResponse } from '../../services/searchService'

export interface ImageSearchState {
    response: {} | MatchResponse, 
    success: boolean, 
    requestComplete: boolean, 
    error: boolean, 
    errorMessage: any
}

export const initialState: ImageSearchState = {
    response: {},
    success: null,
    requestComplete: null,
    error: null,
    errorMessage: null
}

export function imageSearchReducer(state = initialState, action: Action) {

    switch (action.type) {

        case at.EXECUTE_IMAGE_SEARCH: {

            const { response, success, requestComplete, error, errorMessage } = action.payload

            return { ...state, response, success, requestComplete, error, errorMessage }
        }

        case at.RESET_IMAGE_SEARCH: {
            return undefined
        }
    }
}