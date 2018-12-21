import * as React from 'react'
import { SearchResponse } from '../../../services/itemSearchService'


interface Props {
    itemSearchResponse: SearchResponse,
    itemSearchSuccess: boolean,
    itemSearchRequestComplete: boolean,
    searchedItemId: string,
}

class ItemSearchView extends React.Component<Props> {

    constructor(props) {
        super(props)

    }


    public render() {

        const successSection = (<p>We found a match for item id {this.props.searchedItemId}. It's UUID: {this.props.itemSearchResponse.uuid}</p>)
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