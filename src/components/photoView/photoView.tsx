import * as React from "react";

export interface Props {
  photoUri: string;
  photoRef?: any;
}

export class PhotoView extends React.Component<Props, object> {
  public render() {
    return (
      <div className="photoviewer">
        <img
          id="captured-photo"
          className="captured-photo"
          ref={this.props.photoRef}
          src={this.props.photoUri}
        />{" "}
      </div>
    );
  }
}
