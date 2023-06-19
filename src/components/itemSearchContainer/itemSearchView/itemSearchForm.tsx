import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface Props {
  handleSubmit: any;
}

class ItemSearchForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  public render() {
    return (
      <div className="item-search-form">
        <form
          className="form"
          onSubmit={this.props.handleSubmit}
          noValidate
          autoComplete="off"
        >
          <div className="text-field">
            <TextField id="itemId" label="Item ID" margin="normal" />
          </div>
          <Button variant="contained" type="submit">
            Search for item
          </Button>
        </form>
      </div>
    );
  }
}

export { ItemSearchForm };
