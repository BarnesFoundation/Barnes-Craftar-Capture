import * as at from '../actionTypes/cropActionTypes'
import { Action } from '../../interfaces/action'

export class SetCroppedPhoto implements Action {
    
    public type: string = at.SET_CROPPED_PHOTO

    constructor(public payload: { croppedPhotoUri: string }) {}
}

export class ResetCroppedPhoto implements Action {

    public type: string = at.RESET_CROPPED_PHOTO

}