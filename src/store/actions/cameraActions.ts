import * as at from '../actionTypes/cameraActionTypes'
import { Action } from '../../interfaces/action'

export class SetCapturedPhoto implements Action {

    public type: string = at.SET_CAPTURED_PHOTO

    constructor(public payload: { capturedPhotoUri: string, photoWasCaptured: boolean }) {}
}

export class ClearCapturedPhoto implements Action {

    public type: string = at.CLEAR_CAPTURED_PHOTO
}