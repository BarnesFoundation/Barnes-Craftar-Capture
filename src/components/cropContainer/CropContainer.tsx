import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'

import { PhotoView } from './../photoView/photoView'
import { SetCroppedPhoto, ResetCroppedPhoto, UpdateCroppingStatus } from '../../store/actions/cropActions'
import { LoadingDialog } from '../../shared/components/loadingDialog'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export interface Props {
    dispatch: Function,

    // Crop State
    croppedPhotoUri: string,
    croppingIsLoading: boolean,
    croppingIsFinished: boolean,

    // Camera State
    capturedPhotoUri: string,

    // Collection Item State
    id: string
}

class CropContainer extends React.Component<Props> {
    cropper: Cropper;
    photoRef: React.RefObject<{}> | HTMLElement | any;

    constructor(props) {
        super(props);
        this.photoRef = React.createRef();
    }

    componentWillUnmount() {
        this.props.dispatch(new ResetCroppedPhoto());
    };

    async cropPhoto() {
        this.props.dispatch(
            new UpdateCroppingStatus({
                croppingIsLoading: true,
                croppingIsFinished: false,
            })
        );

        const croppedPhotoUri = await new Promise<string>((resolve) => {
            resolve(this.cropper.getCroppedCanvas().toDataURL("image/jpeg", 1));
        });
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

    initializeCropper (photoElement: HTMLImageElement) {
        const dragMode = "none" as Cropper.DragMode;
        this.cropper = new Cropper(photoElement, {
            zoomable: false,
            background: false,
            viewMode: 1,
            dragMode: dragMode,
        });
    };

    componentDidMount() {
        this.initializeCropper(this.photoRef.current);
    }

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
                <PhotoView
                    photoUri={capturedPhotoUri}
                    photoRef={this.photoRef}
                />
                <div className="bottom-buttons">
                    <Button variant="contained" onClick={this.cropPhoto}>
                        Crop
                    </Button>
                </div>
                {croppingIsLoading ? (
                    <LoadingDialog
                        dialogOpen={true}
                        displayText={"Cropping an image"}
                    />
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {

    const { capturedPhotoUri } = state.cameraState;
    const { id } = state.collectionItemState;

    return { ...state.cropState, capturedPhotoUri, id };
}

export const ConnectedCropContainer = connect(mapStateToProps)(CropContainer)