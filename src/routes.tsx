import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './components/home/Home'
import { Camera } from './components/camera/Camera'


const Routes = (
	<BrowserRouter>
		<div>
			<Route exact path="/" component={Home} />
			<Route path="/camera" component={Camera} />
		</div>
	</BrowserRouter>
)

export { Routes }