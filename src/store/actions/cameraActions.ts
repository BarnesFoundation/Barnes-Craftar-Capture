import * as at from '../actionTypes/cameraActionTypes'
import { Action } from '../../interfaces/action'

export class SetCapturedPhotoAndLoading implements Action {

    public type: string = at.SET_CAPTURED_PHOTO_AND_LOADING

    constructor(public payload: { capturedPhotoUri: string, photoFinishedLoading: boolean, photoIsLoading: boolean }) {}
}

export class ClearCapturedPhoto implements Action {

    public type: string = at.CLEAR_CAPTURED_PHOTO
}

export class UpdatePhotoLoaded implements Action {

    public type: string = at.UPDATE_PHOTO_LOADED

    constructor(public payload: { photoIsLoading: boolean }) {}
}

export class UpdatePhotoCapturedAndLoading implements Action {

    public type: string = at.UPDATE_PHOTO_CAPTURED_AND_LOADING

    constructor(public payload: { photoWasCaptured: boolean, photoIsLoading: boolean }) {}
}