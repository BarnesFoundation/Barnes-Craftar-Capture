import * as React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

class ApplicationContainer extends React.Component {
  public render() {
    return (
      <div className="app-container">
        <h1>The Barnes Foundation Craftar Capture Tool</h1>
        <div className="button-container">
          <Button
            variant="contained"
            component={({ innerRef, ...props }) => (
              <Link {...props} to="/item-search" />
            )}
          >
            Search By Item ID
          </Button>
          <Button
            variant="contained"
            component={({ innerRef, ...props }) => (
              <Link {...props} to="/invno-search" />
            )}
          >
            Search By Invno
          </Button>
          <Button
            variant="contained"
            component={({ innerRef, ...props }) => (
              <Link {...props} to="/camera-capture" />
            )}
          >
            Search By Image
          </Button>
        </div>
      </div>
    );
  }
}

export { ApplicationContainer };
