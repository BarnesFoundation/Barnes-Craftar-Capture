import * as at from '../actionTypes/cameraActionTypes'
import * as a from '../actions/cameraActions'
import { Action } from '../../interfaces/action'

export interface CameraState {
    capturedPhotoUri: string,
    photoWasCaptured: boolean,
    photoIsLoading: boolean,
    photoFinishedLoading: boolean
}

export const initialState: CameraState = {
    capturedPhotoUri: null,
    photoWasCaptured: false,
    photoIsLoading: null,
    photoFinishedLoading: null
}

export function cameraState(state: CameraState = initialState, action: Action) {

    switch (action.type) {

        case at.SET_CAPTURED_PHOTO_AND_LOADING: {

            const { capturedPhotoUri, photoFinishedLoading, photoIsLoading } = action.payload

            return { ...state, capturedPhotoUri, photoFinishedLoading, photoIsLoading }
        }

        case at.CLEAR_CAPTURED_PHOTO: {

            return { ...state, photoWasCaptured: false, photoIsLoading: null, photoFinishedLoading: null }
        }

        case at.UPDATE_PHOTO_LOADED: {

            const { photoIsLoading } = action.payload

            return { ...state, photoIsLoading }
        }

        case at.UPDATE_PHOTO_CAPTURED_AND_LOADING: {

            const { photoWasCaptured, photoIsLoading } = action.payload

            return { ...state, photoWasCaptured, photoIsLoading }
        }

        default: {
            return state
        }
    }
}