import { ADD_CAPTURED_PHOTO, CROP_PHOTO, SEARCH_FOR_IMAGE, SEARCH_FOR_IMAGE_REQUEST_COMPLETE, SET_COLLECTION_ITEM, SEARCH_FOR_IMAGE_ERROR, CLEAR_PHOTO_DATA, CLEAR_SEARCH_DATA, ADD_IMAGE_TO_ITEM, ADD_IMAGE_REQUEST_ERROR, ADD_IMAGE_REQUEST_COMPLETE, CLEAR_SET_ITEM, CLEAR_CAPTURED_PHOTO, CLEAR_CROPPED_PHOTO_SET, CLEAR_ADD_IMAGE_DATA } from '../constants/actions-types'

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

export const ClearCapturedPhoto = payload => ({
    type: CLEAR_CAPTURED_PHOTO,
    payload
})

export const ClearSearchData = payload => ({
    type: CLEAR_SEARCH_DATA,
    payload
})

export const AddImageToItem = payload => ({
    type: ADD_IMAGE_TO_ITEM,
    payload
})

export const AddImageRequestError = payload => ({
    type: ADD_IMAGE_REQUEST_ERROR,
    payload
})

export const AddImageRequestComplete = payload => ({
    type: ADD_IMAGE_REQUEST_COMPLETE,
    payload
})

export const ClearSetItem = payload => ({
    type: CLEAR_SET_ITEM,
    payload
})

export const ClearCroppedPhotoSet = payload => ({
    type: CLEAR_CROPPED_PHOTO_SET,
    payload
})

export const ClearAddImageData = payload => ({
    type: CLEAR_ADD_IMAGE_DATA,
    payload
})