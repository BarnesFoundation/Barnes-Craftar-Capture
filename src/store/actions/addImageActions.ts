import * as at from '../actionTypes/addImageActionTypes'
import { Action } from '../../interfaces/action'

export class AddImageRequestSuccess implements Action {

    public type: string = at.ADD_IMAGE_REQUEST_SUCCESS

    constructor(public payload: { response: any, success: boolean, requestComplete: boolean }) {}
}

export class AddImageRequestError implements Action {

    public type: string = at.ADD_IMAGE_REQUEST_ERROR

    constructor(public payload: { error: boolean, errorMessage: any }) {}
}

export class ResetAddImageRequest implements Action {

    public type: string = at.RESET_ADD_IMAGE_REQUEST
}