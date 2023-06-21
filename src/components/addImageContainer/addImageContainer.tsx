import * as React from "react";
import { AddImageView } from "./addImageView/addImageView";
import {
  ImageService,
  ImageReferenceResponse,
} from "../../services/imageService";
import { connect } from "react-redux";
import {
  AddImageRequestSuccess,
  AddImageRequestError,
  ResetAddImageRequest,
  UpdateAddImageRequestStatus,
} from "../../store/actions/addImageActions";
import { ResizeService } from "../../services/resizeService";

export interface Props {
  dispatch: Function;

  // Crop State
  croppedPhotoUri: string;

  // Collection Item State
  id: string;
  uuid: string;

  // Add Image State
  response: ImageReferenceResponse;
  success: boolean;
  requestInProgress: boolean;
  requestComplete: boolean;
  error: boolean;
  errorMessage: string;
}

class AddImageContainer extends React.Component<Props> {
  imageService: ImageService;
  resizeService: ResizeService;

  constructor(props) {
    super(props);
    this.imageService = new ImageService();
    this.resizeService = new ResizeService();
  }

  componentWillUnmount = () => {
    this.props.dispatch(new ResetAddImageRequest());
  };

  addImageToItem = async () => {
    const { croppedPhotoUri, uuid } = this.props;

    let requestInProgress = true;
    let requestComplete = false;
    this.props.dispatch(
      new UpdateAddImageRequestStatus({ requestInProgress, requestComplete })
    );

    try {
      // Get the resized image blob
      const imageBlob = (await this.resizeService.resizeImage(
        croppedPhotoUri,
        "BLOB",
        "REFERENCE_IMAGE"
      )) as Blob;

      // Update the image request success
      const response = await this.imageService.addImage(imageBlob, uuid);
      const success = response.success;
      this.props.dispatch(new AddImageRequestSuccess({ response, success }));
    } catch (e) {
      // Update the image request error
      const error = true;
      const errorMessage = JSON.stringify(e);
      this.props.dispatch(new AddImageRequestError({ error, errorMessage }));
    }

    requestInProgress = false;
    requestComplete = true;
    this.props.dispatch(
      new UpdateAddImageRequestStatus({ requestInProgress, requestComplete })
    );
  };

  public render() {
    const {
      croppedPhotoUri,
      id,
      success,
      response,
      error,
      errorMessage,
      requestInProgress,
      requestComplete,
    } = this.props;

    return (
      <AddImageView
        photoUri={croppedPhotoUri}
        id={id}
        addImageToItem={this.addImageToItem}
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

const mapStateToProps = (state: any) => {
  const { id, uuid } = state.collectionItemState;
  const { croppedPhotoUri } = state.cropState;

  return { ...state.addImageState, id, uuid, croppedPhotoUri };
};

export const ConnectedAddImageContainer =
  connect(mapStateToProps)(AddImageContainer);
