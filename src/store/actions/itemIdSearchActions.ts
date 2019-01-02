import * as at from '../actionTypes/itemIdSearchActionTypes'
import { Action } from '../../interfaces/action'

export class ExecuteItemIdSearch implements Action {

    public type: string = at.EXECUTE_ITEM_ID_SEARCH

    constructor(public payload: { response: any, success: boolean, requestComplete: boolean, id: string }) {}
}

export class SubmitItemIdSearchForm implements Action {

    public type: string = at.SUBMIT_ITEM_ID_SEARCH_FORM

    constructor(public payload: { idToSearch: string }) {}
}

export class ResetItemIdSearch implements Action {

    public type: string = at.RESET_ITEM_ID_SEARCH
}