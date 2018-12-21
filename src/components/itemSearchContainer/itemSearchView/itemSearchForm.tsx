import * as React from 'react'

interface Props {
    handleSubmit: Function
}

class ItemSearchForm extends React.Component<Props> {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        this.props.handleSubmit(event)
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Item Id:
                    <input type="text" name="itemId" id="itemId" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export { ItemSearchForm }