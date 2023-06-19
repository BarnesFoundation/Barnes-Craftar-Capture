import * as at from "../actionTypes/actionTypes";
import { Action } from "../../interfaces/action";

export class AddCapturedPhotoClass implements Action {
  public type: string = "my_type";

  constructor(public payload: string) {}
}

export const AddCapturedPhoto = (payload) => ({
  type: at.ADD_CAPTURED_PHOTO,
  payload,
});

export const CropPhoto = (payload) => ({
  type: at.CROP_PHOTO,
  payload,
});

export const SearchForImage = (payload) => ({
  type: at.SEARCH_FOR_IMAGE,
  payload,
});

export const SearchForImageError = (payload) => ({
  type: at.SEARCH_FOR_IMAGE_ERROR,
  payload,
});

export const SearchForImageRequestComplete = (payload) => ({
  type: at.SEARCH_FOR_IMAGE_REQUEST_COMPLETE,
  payload,
});

export const SetCollectionItem = (payload) => ({
  type: at.SET_COLLECTION_ITEM,
  payload,
});

export const ClearPhotoData = (payload) => ({
  type: at.CLEAR_PHOTO_DATA,
  payload,
});

export const ClearCapturedPhoto = (payload) => ({
  type: at.CLEAR_CAPTURED_PHOTO,
  payload,
});

export const ClearSearchData = (payload) => ({
  type: at.CLEAR_SEARCH_DATA,
  payload,
});

export const AddImageToItem = (payload) => ({
  type: at.ADD_IMAGE_TO_ITEM,
  payload,
});

export const AddImageRequestError = (payload) => ({
  type: at.ADD_IMAGE_REQUEST_ERROR,
  payload,
});

export const AddImageRequestComplete = (payload) => ({
  type: at.ADD_IMAGE_REQUEST_COMPLETE,
  payload,
});

export const ClearSetItem = (payload) => ({
  type: at.CLEAR_SET_ITEM,
  payload,
});

export const ClearCroppedPhotoSet = (payload) => ({
  type: at.CLEAR_CROPPED_PHOTO_SET,
  payload,
});

export const ClearAddImageData = (payload) => ({
  type: at.CLEAR_ADD_IMAGE_DATA,
  payload,
});

export const SearchForItem = (payload) => ({
  type: at.SEARCH_FOR_ITEM,
  payload,
});

export const SubmitSearchForItemForm = (payload) => ({
  type: at.SUBMIT_SEARCH_FOR_ITEM_FORM,
  payload,
});

export const ClearSubmittedSearchForItem = (payload) => ({
  type: at.CLEAR_SUBMITTED_SEARCH_FOR_ITEM,
  payload,
});
