import * as at from '../actionTypes/itemIdSearchActionTypes'
import { Action } from '../../interfaces/action'

export class UpdateItemIdSearchData implements Action {

    public type: string = at.UPDATE_ITEM_ID_SEARCH_DATA

    constructor(public payload: { response: any, success: boolean, searchedId: string }) {}
}

export class UpdateItemIdSearchStatus implements Action {

    public type: string = at.UPDATE_ITEM_ID_SEARCH_STATUS

    constructor(public payload: { requestInProgress: boolean, requestComplete: boolean }) {}
}

export class SubmitItemIdSearchForm implements Action {

    public type: string = at.SUBMIT_ITEM_ID_SEARCH_FORM

    constructor(public payload: { idToSearch: string }) {}
}

export class ResetItemIdSearch implements Action {

    public type: string = at.RESET_ITEM_ID_SEARCH
}

export class UpdateItemImageUrl implements Action {

    public type: string = at.UPDATE_ITEM_IMAGE_URL

    constructor(public payload: { itemImageUrl: string }) {}
}