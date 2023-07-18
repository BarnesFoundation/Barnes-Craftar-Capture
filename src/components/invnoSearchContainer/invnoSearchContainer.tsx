import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SearchService } from "../../services/searchService";
import { InvnoSearchView } from "./invnoSearchView/invnoSearchView";

import {
  UpdateSetItemClicked,
  UpdateInvnoSearchData,
  UpdateInvnoSearchStatus,
  ResetInvnoSearch,
  UpdateItemImageUrl,
} from "../../store/actions/invnoSearchActions";
import { SetCollectionItem } from "../../store/actions/collectionItemActions";

import { InvnoSearchState } from "../../store/reducers/invnoSearchReducer";
import { ConnectedProps } from "../../interfaces/connectedProps";
import { CollectionItemState } from "../../store/reducers/collectionItemReducer";

class InvnoSearchContainer extends React.Component<
  ConnectedProps & InvnoSearchState & CollectionItemState
> {
  invnoSearchService: SearchService;
  itemImageUrl: string;

  constructor(props) {
    super(props);
    this.invnoSearchService = new SearchService();
  }

  componentWillUnmount() {
    this.props.dispatch(new ResetInvnoSearch());
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    // Update that request is in progress
    this.props.dispatch(
      new UpdateInvnoSearchStatus({
        requestInProgress: true,
        requestComplete: false,
      })
    );

    // Update with response data
    const searchedInvno = event.target.invno.value;
    const response = await this.invnoSearchService.searchByInvno(searchedInvno);
    const success = response.success;

    if (success) {
      this.itemImageUrl = response.imageUrl;
      this.props.dispatch(
        new UpdateItemImageUrl({ itemImageUrl: this.itemImageUrl })
      );
    }

    this.props.dispatch(
      new UpdateInvnoSearchData({ response, success, searchedInvno })
    );

    // Update that request is complete
    this.props.dispatch(
      new UpdateInvnoSearchStatus({
        requestInProgress: false,
        requestComplete: true,
      })
    );
  };

  setSearchedItem = async () => {
    const uuid = this.props.response.uuid;
    const id = this.props.response.id;
    const itemImageUrl = this.itemImageUrl;
    const setInvnoClicked = true;

    this.props.dispatch(new SetCollectionItem({ id, uuid, itemImageUrl }));

    this.props.dispatch(new UpdateSetItemClicked({ setInvnoClicked }));
  };

  public render() {
    const {
      searchedInvno,
      response,
      success,
      requestInProgress,
      requestComplete,
      id,
      setInvnoClicked,
    } = this.props;
    if (id && setInvnoClicked) {
      return <Redirect to="/camera-capture"></Redirect>;
    }

    return (
      <InvnoSearchView
        searchedInvno={searchedInvno}
        response={response}
        success={success}
        itemImageUrl={this.itemImageUrl}
        requestInProgress={requestInProgress}
        requestComplete={requestComplete}
        setSearchedItem={this.setSearchedItem}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state.invnoSearchState,
  ...state.collectionItemState,
});

export const ConnectedInvnoSearchContainer =
  connect(mapStateToProps)(InvnoSearchContainer);
