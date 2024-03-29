import * as React from "react";
import { PhotoView } from "../../photoView/photoView";
import { LoadingDialog } from "../../../shared/components/loadingDialog";
import { ImageReferenceResponse } from "../../../services/imageService";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

interface Props {
  photoUri: string;
  id: string;
  addImageToItem: Function;

  success: boolean;
  response: ImageReferenceResponse;

  error: boolean;
  errorMessage: any;

  requestComplete: boolean;
  requestInProgress: boolean;
}

class AddImageView extends React.Component<Props, object> {
  constructor(props) {
    super(props);
  }

  public render() {
    const {
      photoUri,
      requestComplete,
      success,
      error,
      errorMessage,
      requestInProgress,
      id,
    } = this.props;

    const displayText = "Adding image to Vuforia";

    const photoView = <PhotoView photoUri={photoUri}></PhotoView>;
    const addImageButton = (
      <div className="button-container">
        <Button variant="contained" onClick={() => this.props.addImageToItem()}>
          Add Image to Item
        </Button>
      </div>
    );
    const successSection = <p>Successfully added the image to item {id}</p>;
    const failSection = <p>Failed to add the image to item {id}</p>;
    const cameraButton = (
      <div className="button-container">
        <Button
          variant="contained"
          component={({ innerRef, ...props }) => (
            <Link {...props} to="/camera-capture" />
          )}
        >
          Return to Camera
        </Button>
      </div>
    );

    const errorSection = (
      <div>
        <p>The error that occurred:</p>
        <p>{errorMessage}</p>
      </div>
    );

    return (
      <div className="add-image-container">
        <h2>Add Image</h2>
        <p>Use the button below to add the image to Vuforia</p>
        {photoView}
        {requestComplete ? null : addImageButton}
        {requestComplete && success ? successSection : null}
        {requestComplete && !success ? failSection : null}
        {error ? errorSection : null}
        {requestComplete ? cameraButton : null}
        {requestInProgress ? (
          <LoadingDialog displayText={displayText} dialogOpen={true} />
        ) : null}
      </div>
    );
  }
}

export { AddImageView };
