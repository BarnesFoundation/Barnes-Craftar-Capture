import * as at from '../actionTypes/cropActionTypes'
import * as a from '../actions/cropActions'
import { Action } from '../../interfaces/action'

export interface CropState {
    croppedPhotoUri: string
}

export const initialState: CropState = {
    croppedPhotoUri: null
}

export function cropReducer(state: CropState = initialState, action: Action) {

    switch (action.type) {

        case at.SET_CROPPED_PHOTO: {

            const { croppedPhotoUri } = action.payload

            return { ...state, croppedPhotoUri }
        }

        case at.RESET_CROPPED_PHOTO: {

            return undefined
        }
    }
}