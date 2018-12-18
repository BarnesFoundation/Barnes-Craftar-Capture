import { ADD_CAPTURED_PHOTO, CROP_PHOTO, SEARCH_FOR_IMAGE, SEARCH_FOR_IMAGE_REQUEST_COMPLETE, SET_COLLECTION_ITEM, SEARCH_FOR_IMAGE_ERROR, CLEAR_PHOTO_DATA, CLEAR_SEARCH_DATA } from '../constants/actions-types'

export const AddCapturedPhoto = payload => ({
    type: ADD_CAPTURED_PHOTO,
    payload
})

export const CropPhoto = payload => ({
    type: CROP_PHOTO,
    payload
})

export const SearchForImage = payload => ({
    type: SEARCH_FOR_IMAGE,
    payload
})

export const SearchForImageError = payload => ({
    type: SEARCH_FOR_IMAGE_ERROR,
    payload
})

export const SearchForImageRequestComplete = payload => ({
    type: SEARCH_FOR_IMAGE_REQUEST_COMPLETE,
    payload
})

export const SetCollectionItem = payload => ({
    type: SET_COLLECTION_ITEM,
    payload
})

export const ClearPhotoData = payload => ({
  type: CLEAR_PHOTO_DATA,
  payload  
})

export const ClearSearchData = payload => ({
    type: CLEAR_SEARCH_DATA,
    payload
})

