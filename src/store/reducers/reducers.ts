import {
  ADD_CAPTURED_PHOTO,
  CROP_PHOTO,
  SEARCH_FOR_IMAGE,
  SEARCH_FOR_IMAGE_ERROR,
  SEARCH_FOR_IMAGE_REQUEST_COMPLETE,
  SET_COLLECTION_ITEM,
  CLEAR_PHOTO_DATA,
  CLEAR_SEARCH_DATA,
  ADD_IMAGE_TO_ITEM,
  ADD_IMAGE_REQUEST_ERROR,
  ADD_IMAGE_REQUEST_COMPLETE,
  CLEAR_SET_ITEM,
  CLEAR_CAPTURED_PHOTO,
  CLEAR_CROPPED_PHOTO_SET,
  CLEAR_ADD_IMAGE_DATA,
  SEARCH_FOR_ITEM,
  SUBMIT_SEARCH_FOR_ITEM_FORM,
  CLEAR_SUBMITTED_SEARCH_FOR_ITEM,
} from "../actionTypes/actionTypes";

interface Action {
  type: string;
  payload: any;
}

const initialState = {
  // Item state
  itemId: "",
  itemUuid: "",
  itemSet: "",

  photoUri: "",
  photoBlob: undefined,
  photoCaptured: "",

  croppedPhotoUri: "",
  croppedPhotoBlob: undefined,
  croppedPhotoSet: "",

  // Image Search stateness
  imageMatchResponse: undefined,
  imageMatchSuccess: "",
  requestComplete: "",
  requestError: "",
  requestErrorMessage: "",

  // Add Image stateness
  addImageResponse: undefined,
  addImageSuccess: "",
  addImageRequestComplete: "",
  addImageRequestError: "",
  addImageRequestErrorMessage: "",

  // Item Search stateness
  itemSearchResponse: {},
  itemSearchSuccess: null,
  itemSearchRequestComplete: "",

  // Item Search Form stateness
  searchedItemId: "",
};

function rootReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_CAPTURED_PHOTO:
      return {
        ...state,
        photoUri: action.payload.photoUri,
        photoCaptured: action.payload.photoCaptured,
      };

    case CROP_PHOTO:
      return {
        ...state,
        croppedPhotoUri: action.payload.croppedPhotoUri,
        croppedPhotoBlob: action.payload.croppedPhotoBlob,
        croppedPhotoSet: action.payload.croppedPhotoSet,
      };

    case SEARCH_FOR_IMAGE:
      return {
        ...state,
        imageMatchResponse: action.payload.imageMatchResponse,
        imageMatchSuccess: action.payload.imageMatchSuccess,
      };

    case SEARCH_FOR_IMAGE_ERROR:
      return {
        ...state,
        requestError: action.payload.requestError,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case SEARCH_FOR_IMAGE_REQUEST_COMPLETE:
      return { ...state, requestComplete: action.payload.requestComplete };

    case SET_COLLECTION_ITEM:
      return {
        ...state,
        itemSet: action.payload.itemSet,
        itemId: action.payload.itemId,
        itemUuid: action.payload.itemUuid,
      };

    case CLEAR_PHOTO_DATA:
      return {
        ...state,
        photoUri: "",
        photoBlob: undefined,
        croppedPhotoUri: "",
        croppedPhotoBlob: "",
      };

    case CLEAR_CAPTURED_PHOTO:
      return { ...state, photoCaptured: "" };

    case CLEAR_SEARCH_DATA:
      return {
        ...state,
        imageMatchResponse: undefined,
        imageMatchSuccess: "",
        requestComplete: "",
        requestError: "",
        requestErrorMessage: "",
      };

    case ADD_IMAGE_TO_ITEM:
      return {
        ...state,
        addImageResponse: action.payload.addImageResponse,
        addImageSuccess: action.payload.addImageSuccess,
      };

    case ADD_IMAGE_REQUEST_ERROR:
      return {
        ...state,
        addImageRequestError: action.payload.addImageRequestError,
        addImageRequestErrorMessage: action.payload.addImageRequestErrorMessage,
      };

    case ADD_IMAGE_REQUEST_COMPLETE:
      return {
        ...state,
        addImageRequestComplete: action.payload.addImageRequestComplete,
      };

    case CLEAR_SET_ITEM:
      return { ...state, itemId: "", itemUuid: "", itemSet: "" };

    case CLEAR_CROPPED_PHOTO_SET:
      return { ...state, croppedPhotoSet: "" };

    case CLEAR_ADD_IMAGE_DATA:
      return {
        ...state,
        addImageResponse: undefined,
        addImageSuccess: "",
        addImageRequestError: "",
        addImageRequestErrorMessage: "",
        addImageRequestComplete: "",
      };

    case SEARCH_FOR_ITEM:
      return {
        ...state,
        itemSearchResponse: action.payload.itemSearchResponse,
        itemSearchSuccess: action.payload.itemSearchSuccess,
        itemSearchRequestComplete: action.payload.itemSearchRequestComplete,
        searchedItemId: action.payload.searchedItemId,
      };

    case SUBMIT_SEARCH_FOR_ITEM_FORM:
      return {
        ...state,
        itemSearchFormValue: action.payload.itemSearchFormValue,
      };

    case CLEAR_SUBMITTED_SEARCH_FOR_ITEM:
      return {
        ...state,
        itemSearchResponse: {},
        itemSearchSuccess: null,
        itemSearchRequestComplete: null,
      };

    default:
      return state;
  }
}

export { rootReducer };
