import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SearchService } from "../../services/searchService";
import { ItemSearchView } from "./itemSearchView/itemSearchView";

import {
  UpdateSetItemClicked,
  UpdateItemIdSearchData,
  UpdateItemIdSearchStatus,
  ResetItemIdSearch,
  UpdateItemImageUrl,
} from "../../store/actions/itemIdSearchActions";
import { SetCollectionItem } from "../../store/actions/collectionItemActions";

import { ItemIdSearchState } from "../../store/reducers/itemIdSearchReducer";
import { ConnectedProps } from "../../interfaces/connectedProps";
import { CollectionItemState } from "../../store/reducers/collectionItemReducer";

class ItemSearchContainer extends React.Component<
  ConnectedProps & ItemIdSearchState & CollectionItemState
> {
  itemSearchService: SearchService;

  itemImageUrl: string;

  constructor(props) {
    super(props);
    this.itemSearchService = new SearchService();
  }

  componentWillUnmount() {
    this.props.dispatch(new ResetItemIdSearch());
  }

  handleSubmit = async (event) => {
    // Prevent default behavior and reset the search before starting a new one
    event.preventDefault();
    this.props.dispatch(new ResetItemIdSearch());

    // Update that request is in progress
    this.props.dispatch(
      new UpdateItemIdSearchStatus({
        requestInProgress: true,
        requestComplete: false,
      })
    );

    // Get the id to search
    const searchedId = event.target.itemId.value;

    // Update with response data
    const response = await this.itemSearchService.searchByItem(searchedId);
    const success = response.success;

    if (success) {
      this.itemImageUrl = response.imageUrl;
      this.props.dispatch(
        new UpdateItemImageUrl({ itemImageUrl: response.imageUrl })
      );
    }

    this.props.dispatch(
      new UpdateItemIdSearchData({ response, success, searchedId })
    );

    // Update that request is complete
    this.props.dispatch(
      new UpdateItemIdSearchStatus({
        requestInProgress: false,
        requestComplete: true,
      })
    );
  };

  setSearchedItem = async (event: any) => {
    const uuid = this.props.response.uuid;
    const id = this.props.searchedId;
    const itemImageUrl = this.itemImageUrl;
    const setItemClicked = true;

    this.props.dispatch(new SetCollectionItem({ id, uuid, itemImageUrl }));
    this.props.dispatch(new UpdateSetItemClicked({ setItemClicked }));
  };

  public render() {
    const {
      searchedId,
      response,
      success,
      requestInProgress,
      requestComplete,
      id,
      setItemClicked,
    } = this.props;
    if (id && setItemClicked) {
      return <Redirect to="/camera-capture"></Redirect>;
    }

    return (
      <ItemSearchView
        searchedId={searchedId}
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
  ...state.itemIdSearchState,
  ...state.collectionItemState,
});

export const ConnectedItemSearchContainer =
  connect(mapStateToProps)(ItemSearchContainer);
