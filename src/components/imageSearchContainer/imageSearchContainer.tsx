import * as React from "react";
import { ImageSearchView } from "./imageSearchView/imageSearchView";
import { SearchService, SearchResponse } from "../../services/searchService";
import { connect } from "react-redux";
import {
  UpdateImageSearchRequestStatus,
  UpdateImageSearchRequestData,
  UpdateImageSearchRequestError,
  ResetImageSearch,
} from "../../store/actions/imageSearchActions";
import { SetCollectionItem } from "../../store/actions/collectionItemActions";
import { Redirect } from "react-router-dom";
import { ResizeService } from "../../services/resizeService";

export interface Props {
  dispatch: Function;

  // Crop State
  croppedPhotoUri: string;

  // Collection Item State
  id: string;
  uuid: string;

  // Image Search State
  response: SearchResponse;
  success: boolean;
  requestInProgress: boolean;
  requestComplete: boolean;
  error: boolean;
  errorMessage: string;
}

class ImageSearchContainer extends React.Component<Props> {
  searchService: SearchService;
  resizeService: ResizeService;

  constructor(props) {
    super(props);
    this.searchService = new SearchService();
    this.resizeService = new ResizeService();
  }

  componentWillUnmount() {
    this.props.dispatch(new ResetImageSearch());
  }

  imageSearch = async () => {
    const { croppedPhotoUri } = this.props;

    // Update the state that the request is in progress
    this.props.dispatch(
      new UpdateImageSearchRequestStatus({
        requestInProgress: true,
        requestComplete: false,
      })
    );

    try {
      // Resize the image as a blob
      const imageBlob = (await this.resizeService.resizeImage(
        croppedPhotoUri,
        "BLOB",
        "QUERY_IMAGE"
      )) as Blob;

      // Execute the search
      const response = await this.searchService.findImageMatch(imageBlob);
      const success = response.success;
      this.props.dispatch(
        new UpdateImageSearchRequestData({ response, success })
      );
    } catch (error) {
      this.props.dispatch(
        new UpdateImageSearchRequestError({
          error: true,
          // @ts-ignore
          errorMessage: error.message || "",
        })
      );
    }

    // Update the state that the request is complete
    this.props.dispatch(
      new UpdateImageSearchRequestStatus({
        requestInProgress: false,
        requestComplete: true,
      })
    );
  };

  setCollectionItem = async () => {
    if (this.props.response.success === false) {
      return;
    }

    this.props.dispatch(
      new SetCollectionItem({
        id: this.props.response.name,
        uuid: this.props.uuid,
        itemImageUrl: this.props.response.imageUrl,
      })
    );
  };

  public render() {
    const {
      croppedPhotoUri,
      success,
      response,
      error,
      errorMessage,
      requestComplete,
      requestInProgress,
      id,
    } = this.props;

    // If the id was set, navigate to Camera Container component
    if (id) {
      return <Redirect to="/camera-capture"></Redirect>;
    }

    return (
      <ImageSearchView
        setCollectionItem={this.setCollectionItem}
        photoUri={croppedPhotoUri}
        findImageMatch={this.imageSearch}
        success={success}
        response={response}
        error={error}
        errorMessage={errorMessage}
        requestComplete={requestComplete}
        requestInProgress={requestInProgress}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { croppedPhotoUri } = state.cropState;
  const { id, uuid } = state.collectionItemState;

  return { ...state.imageSearchState, croppedPhotoUri, id, uuid };
};

export const ConnectedImageSearchContainer =
  connect(mapStateToProps)(ImageSearchContainer);
