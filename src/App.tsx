import * as React from 'react'
import './App.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class ApplicationContainer extends React.Component {

  public render() {

    return (
      <div>
        <Link to="item-search">Search by Item Id</Link>
        <Link to="camera-capture">Capture Existing Item</Link>
      </div>
    )
  }
}

export { ApplicationContainer }
