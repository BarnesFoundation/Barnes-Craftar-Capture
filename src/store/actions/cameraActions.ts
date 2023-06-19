import * as at from "../actionTypes/cameraActionTypes";
import { Action } from "../../interfaces/action";

export class ClearCapturedPhoto implements Action {
  public type: string = at.CLEAR_CAPTURED_PHOTO;
}

export class UpdatePhotoLoaded implements Action {
  public type: string = at.UPDATE_PHOTO_LOADED;

  constructor(
    public payload: { photoIsLoading: boolean; photoIsLoaded: boolean }
  ) {}
}

export class SetCapturedPhotoData implements Action {
  public type: string = at.SET_CAPTURED_PHOTO_DATA;

  constructor(public payload: { capturedPhotoUri: string }) {}
}
