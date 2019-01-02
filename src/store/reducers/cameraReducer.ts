import * as at from '../actionTypes/cameraActionTypes'
import * as a from '../actions/cameraActions'
import { Action } from '../../interfaces/action'

export interface CameraState {
    capturedPhotoUri: string,
    photoWasCaptured: boolean
}

export const initialState: CameraState = {
    capturedPhotoUri: null,
    photoWasCaptured: false
}

export function cameraReducer(state: CameraState = initialState, action: Action) {

    switch (action.type) {

        case at.SET_CAPTURED_PHOTO: {

            const { capturedPhotoUri, photoWasCaptured } = action.payload

            return { ...state, capturedPhotoUri, photoWasCaptured }
        }

        case at.CLEAR_CAPTURED_PHOTO: {

            return undefined
        }
    }
}