import * as at from '../actionTypes/imageSearchActionTypes'
import { Action } from '../../interfaces/action'

import { MatchResponse } from '../../services/searchService'

export class ExecuteImageSearch implements Action {

    public type: string = at.EXECUTE_IMAGE_SEARCH

    constructor(public payload: { response: MatchResponse, success: boolean, requestComplete: boolean, error?: boolean, errorMessage?: boolean }) {}
}

export class ResetImageSearch implements Action {

    public type: string = at.RESET_IMAGE_SEARCH
}