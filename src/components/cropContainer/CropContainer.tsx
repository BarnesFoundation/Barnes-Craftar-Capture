import * as React from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import {
    SetCroppedPhoto,
    ResetCroppedPhoto,
    UpdateCroppingStatus,
} from "../../store/actions/cropActions";
import { LoadingDialog } from "../../shared/components/loadingDialog";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export interface Props {
    dispatch: Function;

    // Crop State
    croppedPhotoUri: string;
    croppingIsLoading: boolean;
    croppingIsFinished: boolean;

    // Camera State
    capturedPhotoUri: string;

    // Collection Item State
    id: string;
}

class CropContainer extends React.Component<Props> {
    cropper: Cropper;
    cropperRef: React.RefObject<HTMLImageElement>;

    constructor(props) {
        super(props);
        this.cropperRef = React.createRef<HTMLImageElement>();
    }

    componentWillUnmount() {
        this.props.dispatch(new ResetCroppedPhoto());
    }

    onCrop = () => {
        this.props.dispatch(
            new UpdateCroppingStatus({
                croppingIsLoading: true,
                croppingIsFinished: false,
            })
        );

        const croppedPhotoUri = this.cropper.getCroppedCanvas().toDataURL();

        this.props.dispatch(new SetCroppedPhoto({ croppedPhotoUri }));
        setTimeout(() => {
            this.props.dispatch(
                new UpdateCroppingStatus({
                    croppingIsLoading: false,
                    croppingIsFinished: true,
                })
            );
        }, 500);
    };

    public render() {
        const {
            id,
            capturedPhotoUri,
            croppingIsLoading,
            croppingIsFinished,
        } = this.props;

        // If the photo was cropped but not id is set, navigate to Image Search component
        if (croppingIsFinished && !id) {
            return (
                <Redirect
                    to={{
                        pathname: "/search-image",
                    }}
                />
            );
        }

        // If the photo was cropped and an id is already set, navigate to Add Image component
        if (croppingIsFinished && id) {
            return (
                <Redirect
                    to={{
                        pathname: "/add-image",
                    }}
                />
            );
        }

        return (
            <div className="crop-container">
                <h2>Crop Image</h2>
                <p>Adjust the crop to focus in on the artwork.</p>

                <Cropper
                    src={capturedPhotoUri}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1}
                    responsive={true}
                    guides={false}
                    ref={this.cropperRef}
                    autoCropArea={1}
                    viewMode={1}
                    onInitialized={(cropperInstance) => {
                        this.cropper = cropperInstance;
                    }}
					checkOrientation={false}
                />

                <div className="bottom-buttons">
                    <Button variant="contained" onClick={this.onCrop}>
                        Crop
                    </Button>
                </div>
                {croppingIsLoading && (
                    <LoadingDialog
                        dialogOpen={true}
                        displayText={"Cropping an image"}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        ...state.cropState,
        capturedPhotoUri: state.cameraState.capturedPhotoUri,
        id: state.collectionItemState.id,
    };
};

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer);
