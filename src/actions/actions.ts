import { ADD_CAPTURED_PHOTO, CROP_PHOTO } from '../constants/actions-types'

export const AddCapturedPhoto = payload => ({
    type: ADD_CAPTURED_PHOTO,
    payload
})

export const CropPhoto = payload => ({
    type: CROP_PHOTO,
    payload
})