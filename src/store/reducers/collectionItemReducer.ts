import * as at from '../actionTypes/collectionItemTypes'
import * as a from '../actions/collectionItemActions'
import { Action } from '../../interfaces/action'

export interface CollectionItemState {
    id: string,
    uuid: string,
}

export const initialState: CollectionItemState = {
    id: null,
    uuid: null
}

export function collectionItemState(state = initialState, action: Action) {

    switch (action.type) {

        case at.SET_COLLECTION_ITEM: {

            const { id, uuid } = action.payload

            return { ...state, id, uuid }
        }

        case at.RESET_SET_COLLECTION_ITEM: {
            return undefined
        }
        
        default: {
            return state
        }
    }
}