import * as React from "react";
import { SearchResponse } from "../../../services/searchService";
import { ItemSearchForm } from "../itemSearchView/itemSearchForm";
import { LoadingDialog } from "../../../shared/components/loadingDialog";
import Button from "@material-ui/core/Button";

interface Props {
  response: SearchResponse;
  success: boolean;
  requestInProgress: boolean;
  requestComplete: boolean;
  itemImageUrl: string;
  searchedId: string;
  setSearchedItem: any;
  handleSubmit: Function;
}

const displayText = "Searching Vuforia for the ID";

class ItemSearchView extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { requestComplete, requestInProgress, success, itemImageUrl } =
      this.props;

    const itemSearchForm = (
      <ItemSearchForm handleSubmit={this.props.handleSubmit}></ItemSearchForm>
    );
    const setItemButton = (
      <Button
        variant="contained"
        onClick={this.props.setSearchedItem}
        className="set-item-button"
      >
        Set item {this.props.searchedId} for capture
      </Button>
    );

    const matchResultText = this.props.success
      ? "Match found"
      : "No match found";

    const itemImage = itemImageUrl ? (
      <img src={itemImageUrl}></img>
    ) : (
      <p>A reference image does not exist</p>
    );

    return (
      <div className="item-search-container">
        <div className="search-result">
          <h2>Search By Item ID</h2>
          <div className={this.props.requestComplete ? "unhidden" : "hidden"}>
            <h3>{this.props.requestComplete ? matchResultText : null}</h3>
            {requestComplete && success ? itemImage : null}
            {requestComplete && this.props.response.success ? (
              <table>
                <tbody>
                  <tr>
                    <th>ID:</th>
                    <td>{this.props.searchedId}</td>
                  </tr>
                  <tr>
                    <th>UUID:</th>
                    <td>{this.props.response.uuid}</td>
                  </tr>
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
        {itemSearchForm}
        <div className="button-container">
          {requestComplete && success ? setItemButton : null}
        </div>
        {requestInProgress ? (
          <LoadingDialog displayText={displayText} dialogOpen={true} />
        ) : null}
      </div>
    );
  }
}

export { ItemSearchView };
