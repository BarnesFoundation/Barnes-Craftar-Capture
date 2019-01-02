import * as at from '../actionTypes/cropActionTypes'
import * as a from '../actions/cropActions'
import { Action } from '../../interfaces/action'

export interface CropState {
    croppedPhotoUri: string
    photoWasCropped: boolean
}

export const initialState: CropState = {
    croppedPhotoUri: null,
    photoWasCropped: null
}

export function cropState(state: CropState = initialState, action: Action) {

    switch (action.type) {

        case at.SET_CROPPED_PHOTO: {

            const { croppedPhotoUri, photoWasCropped } = action.payload

            return { ...state, croppedPhotoUri, photoWasCropped }
        }

        case at.RESET_CROPPED_PHOTO: {

            return { ...state, photoWasCropped: false }
        }

        default: {
            return state
        }
    }
}