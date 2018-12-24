import * as React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';

class ApplicationContainer extends React.Component {

  public render() {

    return (
      <div className="app">
        <div className="container">
          <Button variant="contained" component={({ innerRef, ...props }) => <Link {...props} to="/item-search" />}>Search By Item ID</Button>
          <Button variant="contained" component={({ innerRef, ...props }) => <Link {...props} to="/camera-capture" />}>Capture Existing Item</Button>
        </div>
      </div>
    )
  }
}

export { ApplicationContainer }
