import * as React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {

	public render() {
		return (
			<div className="home">
				<h1>The Barnes Foundation Craftar Capture</h1>
				<Link to="/camera">Camera button</Link>
			</div>)
	}
}

export { Home }