import * as at from '../actionTypes/collectionItemTypes'
import { Action } from '../../interfaces/action'

export class SetCollectionItem implements Action {

    public type: string = at.SET_COLLECTION_ITEM

    constructor(public payload: { id: string, uuid: string }) {}
}

export class ResetCollectionItem implements Action {

    public type: string = at.RESET_SET_ITEM
}