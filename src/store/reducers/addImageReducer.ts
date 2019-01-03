import * as at from '../actionTypes/addImageActionTypes'
import * as a from '../actions/addImageActions'
import { Action } from '../../interfaces/action'

export interface AddImageState {
    response: any,
    success: boolean,
    requestInProgress: boolean
    requestComplete: boolean,
    error: boolean,
    errorMessage: any
}

export const initialState: AddImageState = {
    response: {},
    success: null,
    requestInProgress: null,
    requestComplete: null,
    error: null,
    errorMessage: null
}

export function addImageState(state: AddImageState = initialState, action: Action) {

    switch (action.type) {

        case at.ADD_IMAGE_REQUEST_SUCCESS: {

            const { response, success } = action.payload
            
            return { ...state, response, success }
        }

        case at.ADD_IMAGE_REQUEST_ERROR: {

            const { error, errorMessage } = action.payload

            return { ...state, error, errorMessage }
        }

        case at.RESET_ADD_IMAGE_REQUEST: {

            return { ...state, response: {}, success: null, requestComplete: null, error: null, errorMessage: null, requestInProgress: null }
        }

        case at.UPDATE_ADD_IMAGE_REQUEST_STATUS: {

            const { requestInProgress, requestComplete } = action.payload

            return { ...state, requestInProgress, requestComplete }
        }

        default: {
            return state
        }
    }
}
