import * as React from 'react'
import { SearchResponse } from '../../../services/itemSearchService'

interface Props {
    itemSearchResponse: SearchResponse,
    itemSearchSuccess: boolean,
    itemSearchRequestComplete: boolean,
    searchedItemId: string,
    setSearchedItem: Function
}

class ItemSearchView extends React.Component<Props> {

    constructor(props) { super(props) }

    /** Sets the searched item into the state of the application */
    setSearchedItem = (event) => { this.props.setSearchedItem() }

    public render() {

        const matchResultText = ((this.props.itemSearchSuccess) ? 'Match found' : 'No match found')

        const searchResultGrid = (
            <table>
                <tbody>
                    <tr>
                        <th>ID:</th>
                        <td>{this.props.itemSearchResponse.name}</td>
                    </tr>
                    <tr>
                        <th>UUID:</th>
                        <td>{this.props.itemSearchResponse.uuid}</td>
                    </tr>
                </tbody>
            </table>
        )

        return (
            <div className="search-result">
            <h2>Search By Item ID</h2>
                <div className={(this.props.itemSearchRequestComplete) ? "unhidden" : "hidden"}>
                    <h3>{(this.props.itemSearchRequestComplete) ? matchResultText : null}</h3>
                    {searchResultGrid}
                </div>
            </div>
        )

    }
}

export { ItemSearchView }