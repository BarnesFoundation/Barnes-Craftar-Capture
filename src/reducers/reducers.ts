import { ADD_CAPTURED_PHOTO, CROP_PHOTO } from '../constants/actions-types'

interface action {
    type: string,
    payload: any
}

const initialState = {
    
    itemId: '',
    itemUuid: '',

    photoUri: '',
    photoBlob: undefined,

    croppedPhotoUri: '',
    croppedPhotoBlob: undefined,

}

function rootReducer(state = initialState, action) {

    switch (action.type) {

        case ADD_CAPTURED_PHOTO:
            return { ...state, photoUri: action.payload.photoUri }

        case CROP_PHOTO:
            return { ...state, croppedPhotoUri: action.payload.croppedPhotoUri, croppedPhotoBlob: action.payload.croppedPhotoBlob }

        default:
            return state
    }
}

export { rootReducer }
