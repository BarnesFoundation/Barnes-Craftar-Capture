import * as React from 'react'

interface Props {
    itemSearch: Function
}

class ItemSearchView extends React.Component<Props> {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        this.props.itemSearch()
        /* console.log('Form submitted', event.target.value)
        event.preventDefault() */
    }

    public render() {

        const itemForm = (
            <form onSubmit={this.handleSubmit}>
                <label>Item Id:
                    <input type="text" name="itemId" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )

        const button = ( <button onClick={this.handleSubmit}>Submit Id</button>)

        return (
            <div>
                {itemForm}
                {button}
            </div>
        )
    }
}

export { ItemSearchView }