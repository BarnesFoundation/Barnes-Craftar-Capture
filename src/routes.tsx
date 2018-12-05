import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './components/home/Home'
import { CameraContainer } from './components/cameraContainer/CameraContainer'


const Routes = (
	<BrowserRouter>
		<div>
			<Route exact path="/" component={Home} />
			<Route path="/camera" component={CameraContainer} />
		</div>
	</BrowserRouter>
)

export { Routes }