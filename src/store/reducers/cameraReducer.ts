import * as at from '../actionTypes/cameraActionTypes'
import * as a from '../actions/cameraActions'
import { Action } from '../../interfaces/action'

export interface CameraState {
    capturedPhotoUri: string,
    photoIsLoading: boolean,
    photoIsLoaded: boolean
}

export const initialState: CameraState = {
    capturedPhotoUri: null,
    photoIsLoading: null,
    photoIsLoaded: null
}

export function cameraState(state: CameraState = initialState, action: Action) {

    switch (action.type) {

        case at.SET_CAPTURED_PHOTO_DATA: {

            const { capturedPhotoUri } = action.payload

            return { ...state, capturedPhotoUri }
        }

        case at.CLEAR_CAPTURED_PHOTO: {

            return { ...state, photoIsLoading: null, photoIsLoaded: null }
        }

        case at.UPDATE_PHOTO_LOADED: {

            const { photoIsLoading, photoIsLoaded } = action.payload

            return { ...state, photoIsLoading, photoIsLoaded }
        }

        default: {
            return state
        }
    }
}