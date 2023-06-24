import * as at from "../actionTypes/imageSearchActionTypes";
import { Action } from "../../interfaces/action";

import { SearchResponse } from "../../services/searchService";

export class UpdateImageSearchRequestData implements Action {
  public type: string = at.UPDATE_IMAGE_SEARCH_REQUEST_DATA;

  constructor(public payload: { response: SearchResponse; success: boolean }) {}
}

export class UpdateImageSearchRequestStatus implements Action {
  public type: string = at.UPDATE_IMAGE_SEARCH_REQUEST_STATUS;

  constructor(
    public payload: { requestInProgress: boolean; requestComplete: boolean }
  ) {}
}

export class UpdateImageSearchRequestError implements Action {
  public type: string = at.UPDATE_IMAGE_SEARCH_REQUEST_ERROR;

  constructor(public payload: { error: boolean; errorMessage: any }) {}
}

export class ResetImageSearch implements Action {
  public type: string = at.RESET_IMAGE_SEARCH;
}
