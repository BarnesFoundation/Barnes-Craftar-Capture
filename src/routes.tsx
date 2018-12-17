import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { ApplicationContainer } from './App'
import { CameraContainer } from './components/cameraContainer/cameraContainer'
import { CropContainer } from './components/cropContainer/CropContainer'
import { ImageSearchContainer } from './components/imageSearchContainer/imageSearchContainer'
import { AddImageView } from './components/addImageContainer/addImageView/addImageView';

const Routes = (
	<BrowserRouter>
		<div>
			<Route exact path="/" component={ApplicationContainer} />
			<Route path="/create-item" component={null} />
			<Route path="/camera-capture" component={CameraContainer} />
			<Route path="/crop-image" component={CropContainer} />
			<Route path="/search-image" component={ImageSearchContainer} />
			<Route path="/add-image" component={AddImageView} />
		</div>
	</BrowserRouter>
)

export { Routes }