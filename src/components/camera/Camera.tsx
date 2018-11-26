import * as React from 'react'

class Camera extends React.Component {

	capturePhoto = () => {
		console.log('Capturing a photo')
	}

	public render() {
		return (
			<div className="camera">
				<h1>The camera component</h1>
				<button onClick={this.capturePhoto}>Camera button</button>
			</div>)
	}
}

export { Camera }