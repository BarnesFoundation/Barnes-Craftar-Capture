import * as at from "../actionTypes/collectionItemTypes";
import * as a from "../actions/collectionItemActions";
import { Action } from "../../interfaces/action";

export interface CollectionItemState {
  id: string;
  uuid: string;
  itemImageUrl: string;
}

export const initialState: CollectionItemState = {
  id: null,
  uuid: null,
  itemImageUrl: null,
};

export function collectionItemState(state = initialState, action: Action) {
  switch (action.type) {
    case at.SET_COLLECTION_ITEM: {
      const { id, uuid, itemImageUrl } = action.payload;

      return { ...state, id, uuid, itemImageUrl };
    }

    case at.RESET_SET_COLLECTION_ITEM: {
      return { id: null, uuid: null, itemImageUrl: null };
    }

    default: {
      return state;
    }
  }
}
