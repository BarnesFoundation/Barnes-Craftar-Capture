import * as at from '../actionTypes/cropActionTypes'
import * as a from '../actions/cropActions'
import { Action } from '../../interfaces/action'

export interface CropState {
    croppedPhotoUri: string
    photoWasCropped: boolean,
    croppingIsLoading: boolean,
    croppingIsFinished: boolean
}

export const initialState: CropState = {
    croppedPhotoUri: null,
    photoWasCropped: null,
    croppingIsLoading: null,
    croppingIsFinished: null
}

export function cropState(state: CropState = initialState, action: Action) {

    switch (action.type) {

        case at.SET_CROPPED_PHOTO: {

            const { croppedPhotoUri, photoWasCropped } = action.payload

            return { ...state, croppedPhotoUri, photoWasCropped }
        }

        case at.RESET_CROPPED_PHOTO: {

            return { ...state, photoWasCropped: null, croppingIsLoading: null, croppingIsFinished: null }
        }

        case at.UPDATE_CROPPING_STATUS: {

            const { croppingIsLoading, croppingIsFinished } = action.payload

            return { ...state, croppingIsLoading, croppingIsFinished }
        }

        default: {
            return state
        }
    }
}