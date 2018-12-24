import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


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

    handleChange(event) {
        console.log(event.target.value)
    }

    public render() {
        return (
            <div className="item-search-form">
                <form className="form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <TextField id="itemId" label="Item ID" margin="normal" />
                    <Button variant="contained" type="submit" value="Submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export { ItemSearchForm }