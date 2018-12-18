import { ADD_CAPTURED_PHOTO, CROP_PHOTO, SEARCH_FOR_IMAGE, SEARCH_FOR_IMAGE_ERROR, SEARCH_FOR_IMAGE_REQUEST_COMPLETE, SET_COLLECTION_ITEM, CLEAR_PHOTO_DATA, CLEAR_SEARCH_DATA } from '../constants/actions-types'

interface action {
    type: string,
    payload: any
}

const initialState = {

    itemId: '',
    itemUuid: '',
    itemSet: '',

    photoUri: '',
    photoBlob: undefined,

    croppedPhotoUri: '',
    croppedPhotoBlob: undefined,

    imageMatchResponse: undefined,
    imageMatchSuccess: '',
    requestComplete: '',
    requestError: '',
    requestErrorMessage: ''
}

function rootReducer(state = initialState, action) {

    switch (action.type) {

        case ADD_CAPTURED_PHOTO:
            return { ...state, photoUri: action.payload.photoUri }

        case CROP_PHOTO:
            return { ...state, croppedPhotoUri: action.payload.croppedPhotoUri, croppedPhotoBlob: action.payload.croppedPhotoBlob }

        case SEARCH_FOR_IMAGE:
            return { ...state, imageMatchResponse: action.payload.imageMatchResponse, imageMatchSuccess: action.payload.imageMatchSuccess }

        case SEARCH_FOR_IMAGE_ERROR:
            return { ...state, requestError: action.payload.requestError, requestErrorMessage: action.payload.requestErrorMessage }

        case SEARCH_FOR_IMAGE_REQUEST_COMPLETE:
            return { ...state, requestComplete: action.payload.requestComplete }

        case SET_COLLECTION_ITEM:
            return { ...state, itemSet: action.payload.itemSet, itemId: action.payload.itemId, itemUuid: action.payload.itemUuid }

        case CLEAR_PHOTO_DATA:
            return { ...state, photoUri: '', photoBlob: undefined, croppedPhotoUri: '', croppedPhotoBlob: ''}

        case CLEAR_SEARCH_DATA:
            return { ...state, imageMatchResponse: undefined, imageMatchSuccess: '', requestComplete: '', requestError: '', requestErrorMessage: '' }

        default:
            return state
    }
}

export { rootReducer }
