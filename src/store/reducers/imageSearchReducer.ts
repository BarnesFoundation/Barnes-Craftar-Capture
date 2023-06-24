import * as at from "../actionTypes/imageSearchActionTypes";
import * as a from "../actions/imageSearchActions";
import { Action } from "../../interfaces/action";

import { SearchResponse } from "../../services/searchService";

export interface ImageSearchState {
  response: {} | SearchResponse;
  success: boolean;
  requestInProgress: boolean;
  requestComplete: boolean;
  error: boolean;
  errorMessage: any;
}

export const initialState: ImageSearchState = {
  response: {},
  success: null,
  requestInProgress: null,
  requestComplete: null,
  error: null,
  errorMessage: null,
};

export function imageSearchState(state = initialState, action: Action) {
  switch (action.type) {
    case at.UPDATE_IMAGE_SEARCH_REQUEST_DATA: {
      const { response, success } = action.payload;

      return { ...state, response, success };
    }

    case at.UPDATE_IMAGE_SEARCH_REQUEST_STATUS: {
      const { requestInProgress, requestComplete } = action.payload;

      return { ...state, requestInProgress, requestComplete };
    }

    case at.UPDATE_IMAGE_SEARCH_REQUEST_ERROR: {
      const { error, errorMessage } = action.payload;

      return { ...state, error, errorMessage };
    }

    case at.RESET_IMAGE_SEARCH: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
