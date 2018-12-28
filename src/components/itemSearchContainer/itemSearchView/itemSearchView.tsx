import * as React from 'react'
import { SearchResponse } from '../../../services/itemSearchService'
import Button from '@material-ui/core/Button'


interface Props {
    itemSearchResponse: SearchResponse,
    itemSearchSuccess: boolean,
    itemSearchRequestComplete: boolean,
    searchedItemId: string,
    setSearchedItem: Function
}

class ItemSearchView extends React.Component<Props> {

    constructor(props) {
        super(props)

    }

    setSearchedItem = (event) => {
        this.props.setSearchedItem()
    }

    public render() {

        const successSection = (
            <div>
                <p>Match found for Item Id: {this.props.searchedItemId}.</p>
                <p>ID: {this.props.itemSearchResponse.name}</p>
                <p>UUID: {this.props.itemSearchResponse.uuid}</p>
                <Button variant="contained" onClick={this.setSearchedItem}>Set item</Button>
            </div>
        )
        const failureSection = (<p>We could not find a match for item id {this.props.searchedItemId}</p>)

        return (
            <div>
                {(this.props.itemSearchRequestComplete && this.props.itemSearchSuccess) ? successSection : null}
                {(this.props.itemSearchRequestComplete && !this.props.itemSearchSuccess) ? failureSection : null}
            </div>
        )

    }
}

export { ItemSearchView }