import * as at from "../actionTypes/invnoSearchActionTypes";
import { Action } from "../../interfaces/action";

export class UpdateInvnoSearchData implements Action {
  public type: string = at.UPDATE_INVNO_SEARCH_DATA;

  constructor(
    public payload: { response: any; success: boolean; searchedInvno: string }
  ) {}
}

export class UpdateInvnoSearchStatus implements Action {
  public type: string = at.UPDATE_INVNO_SEARCH_STATUS;

  constructor(
    public payload: { requestInProgress: boolean; requestComplete: boolean }
  ) {}
}

export class ResetInvnoSearch implements Action {
  public type: string = at.RESET_INVNO_SEARCH;
}

export class UpdateItemImageUrl implements Action {
  public type: string = at.UPDATE_ITEM_IMAGE_URL;

  constructor(public payload: { itemImageUrl: string }) {}
}

export class UpdateSetItemClicked implements Action {
  public type: string = at.UPDATE_SET_ITEM_CLICKED;

  constructor(public payload: { setInvnoClicked: boolean }) {}
}
